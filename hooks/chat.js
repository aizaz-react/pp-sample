import { get, post, put } from '@/utils/axios';
import {
  getInferenceTime,
  getUserDetails,
  imageModel,
  renderResponse,
  replaceContentWithUserRole
} from '@/utils/globalFuntions';
import { useTheme } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetHyperParameters } from './hyperParameter';
import { HyperParametersContext } from '@/components/hoc/HyperParametersContext';

export const useSendMessage = ({ id, callback, message }) => {
  const { mutate: addconversation } = useAddConversation({ id });
  const { data } = useGetHyperParameters({ id });
  const queryClient = useQueryClient();
  const user = getUserDetails();
  const theme = useTheme();
  return useMutation({
    mutationFn: (values) => {
      const hyperparameters = id && data?.hyper_parameters;
      return post('/chat', {
        tenant_id: user.tenant_id,
        hyperparameters,
        ...values
      });
    },
    onMutate: (values) => {
      if (!id) {
        callback({
          message: { post_challange: { ...values }, response: 'loading' },
          rollback: false
        });
        return { startTime: performance.now() };
      }

      const previousData = queryClient.getQueryData(['conversation', id]);
      queryClient.setQueryData(['conversation', id], (old) => ({
        ...previousData,
        conversation: {
          ...previousData.conversation,
          [id]: {
            ...previousData.conversation[id],
            nodes: [
              ...previousData.conversation[id].nodes,
              { prompts: values.prompts, message: 'loading' }
            ]
          }
        }
      }));
      setTimeout(() => {
        callback();
      });
      return { previousData, startTime: performance.now() };
    },
    onError: (err, values, context) => {
      toast.error(err?.response?.data?.message || err.message);
      queryClient.setQueryData(['conversation', id], (old) => ({
        ...context.previousData,
        conversation: {
          ...context.previousData?.conversation,
          [id]: {
            ...context.previousData?.conversation[id],
            nodes: [...context.previousData.conversation[id].nodes]
          }
        }
      }));
    },
    onSuccess: (data, values, context) => {
      const inference_time = getInferenceTime(context.startTime);
      if (
        data.response === null ||
        data.response === 'Invalid Model Slug' ||
        (!!data?.response?.choices?.length &&
          data?.response?.choices[0]?.message?.content === 'Resource not found')
      ) {
        toast.error(
          data.response?.choices?.length
            ? data.response?.choices[0]?.message?.content
            : data.response || 'Prompt failed'
        );

        !!context.previousData?.conversation &&
          queryClient.setQueryData(['conversation', id], (old) => ({
            ...context.previousData,
            conversation: {
              ...context.previousData?.conversation,
              [id]: {
                ...context.previousData?.conversation[id],
                nodes: [...context.previousData.conversation[id].nodes]
              }
            }
          }));

        callback({
          removechat: true,
          message: { ...data },
          rollback: true
        });
        return;
      }
      if (
        !imageModel(values.model) &&
        !renderResponse({
          theme,
          string: !!data?.response?.choices
            ? data.response?.choices[0]?.message?.content
            : data.response
        })
      ) {
        toast.error('Prompt failed');
        queryClient.setQueryData(['conversation', id], (old) => ({
          ...context.previousData,
          conversation: {
            ...context.previousData?.conversation,
            [id]: {
              ...context.previousData?.conversation[id],
              nodes: [...context?.previousData?.conversation[id].nodes]
            }
          }
        }));
        callback({
          removechat: true,
          message: { ...data },
          rollback: true
        });
        return;
      }
      let prompts = [...data.post_challange.prompts];
      if (!!values.vault) {
        prompts.splice(-2, 1);
      }

      if (typeof data.response === 'string') {
        const payload = {
          inference_time,
          hyperparameters: data.post_challange.hyperparameters,
          prompts: data.post_challange.prompts,
          product: data.post_challange.model,
          message: data.response,
          usage: data.response.usage,
          vault_id: data.post_challange.vault
        };

        !!context.previousData?.conversation &&
          queryClient.setQueryData(['conversation', id], (old) => ({
            ...context.previousData,
            conversation: {
              ...context.previousData?.conversation,
              [id]: {
                ...context.previousData?.conversation[id],
                nodes: [...context.previousData.conversation[id].nodes, payload]
              }
            }
          }));

        callback({
          message: { ...data },
          rollback: true
        });
        toast.error('Prompt failed');
        return;
      }
      const payload = {
        inference_time,
        hyperparameters: data.post_challange.hyperparameters,
        prompts: data.post_challange.prompts,
        product: data.post_challange.model,
        message: data.response.choices[0].message,
        usage: data.response.usage,
        vault_id: data.post_challange.vault
      };
      addconversation(payload);
      if (!id && typeof data.response !== 'string') {
        callback({
          message: { ...data },
          rollback: true
        });
        return;
      }

      queryClient.setQueryData(['conversation', id], (old) => ({
        ...context.previousData,
        conversation: {
          ...context.previousData?.conversation,
          [id]: {
            ...context.previousData?.conversation[id],
            nodes: [...context.previousData.conversation[id].nodes, payload]
          }
        }
      }));
      callback();
    }
  });
};

export const useSendStudioMessage = ({ id, callback, title }) => {
  const {
    mutate: addconversation,
    isLoading: loading,
    status
  } = useAddConversation({ id });
  const { values: contextHyperparameters } = useContext(HyperParametersContext);
  const { data } = useGetHyperParameters(id ? { id } : {});

  const user = getUserDetails();
  const theme = useTheme();
  const { mutate, isLoading } = useMutation({
    mutationFn: (values) => {
      const hyperparameters = id
        ? {
            ...data?.hyper_parameters,
            context_chaining: !imageModel(values.model)
          }
        : {
            ...contextHyperparameters,
            context_chaining: !imageModel(values.model)
          };

      return post('/chat', {
        tenant_id: user.tenant_id,
        ...values,
        hyperparameters
      });
    },
    onMutate: () => {
      return { startTime: performance.now() };
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (data, values, context) => {
      const inference_time = getInferenceTime(context.startTime);
      if (
        data.response === null ||
        data.response === 'Invalid Model Slug' ||
        (!!data?.response?.choices?.length &&
          data?.response?.choices[0]?.message?.content === 'Resource not found')
      ) {
        toast.error(
          data.response?.choices?.length
            ? data.response?.choices[0]?.message?.content
            : data.response || 'Prompt failed'
        );
        return;
      }
      if (
        !imageModel(values.model) &&
        !renderResponse({
          theme,
          string: !!data?.response?.choices
            ? data.response?.choices[0]?.message?.content
            : data.response
        })
      ) {
        toast.error('Prompt failed');
        return;
      }

      addconversation(replaceContentWithUserRole(data, title, inference_time));
      callback();
    }
  });
  useEffect(() => {
    if (status === 'success') {
      callback();
    }
  }, [status, callback]);
  return { mutate, isLoading: isLoading || loading };
};

export const useGetConversation = () => {
  return useQuery({
    queryKey: ['conversation'],
    queryFn: () => get('/conversations')
  });
};

export const useAddConversation = ({ id, message }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data) =>
      post('/conversations', {
        conversation_id: id,
        ...data
      }),
    onSuccess: (data, values) => {
      if (typeof values.response === 'string') return;
      if (!id) {
        queryClient.invalidateQueries(['conversation']);
        router.push(`/chat/${data?.conversation_id}`);
      }

      queryClient.setQueryData(['conversation', data?.conversation_id], () => ({
        success: true,
        message: 'Conversation details',
        conversation: {
          [data?.conversation_id]: {
            nodes: [values]
          }
        }
      }));
    },
    onError: (err) => toast.error(err?.response?.data?.message || err.message)
  });
};

export const useUpdateConversation = (resetState) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
      put(`/conversations/metadata`, {
        conversation_id: values.conv_id,
        title: values.title
      }),

    onMutate: (data) => {
      const prevData = queryClient.getQueryData(['conversation']);
      const previousData = JSON.parse(JSON.stringify(prevData));
      const { conversations } = previousData;
      const index = conversations.findIndex(
        (obj) => obj.conv_id === data.conv_id
      );
      conversations[index] = { ...data };
      queryClient.setQueryData(['conversation'], (old) => ({
        ...old,
        conversations
      }));
      resetState();
      return { previousData };
    },
    onError: (err, variables, { previousData }) => {
      queryClient.setQueriesData(['conversation'], (old) => previousData);
      toast.error(err?.response?.data?.message || err.message);
    }
  });
};

export const useDeleteConversation = (resetState, isClearChat = null) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data) =>
      post(`/conversations/delete`, { conversation_ids: [data.id] }),
    onMutate: (data) => {
      const prevData = queryClient.getQueryData(['conversation']);
      const previousData = JSON.parse(JSON.stringify(prevData));
      const { conversations } = previousData;
      const rest = conversations.filter((obj) => obj.conv_id !== data.id);
      queryClient.setQueryData(['conversation'], (old) => ({
        ...old,
        conversations: [...rest]
      }));
      resetState();
      if (rest.length > 0 && !isClearChat) {
        router.push(`/chat/${rest[0].conv_id}`);
      } else {
        router.push(`/chat`);
      }
      return { previousData };
    },
    onError: (err, variables, { previousData }) => {
      queryClient.setQueriesData(['conversation'], (old) => previousData);
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversation']);
    }
  });
};

export const useGetConversationById = (id, scrollToBottom) => {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => get(`/conversations?conversation_id=${id}`),
    onSuccess: () => {
      setTimeout(() => {
        scrollToBottom();
      });
    },

    enabled: !!id
  });
};
