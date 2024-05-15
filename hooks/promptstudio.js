import { useAddConversation } from '@/hooks/chat';
import { del, get, post, postFormData, put, putFormData } from '@/utils/axios';
import {
  getInferenceTime,
  replaceContentWithUserRole
} from '@/utils/globalFuntions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetHyperParameters } from './hyperParameter';
import { imageModel } from '@/utils/globalFuntions';
import { HyperParametersContext } from '@/components/hoc/HyperParametersContext';

export const useGetSubscribeStudioProducts = (data) => {
  const { search = '', cb } = data;
  return useQuery({
    queryKey: ['studio-products-subscribe', { search: search || '' }],
    queryFn: () =>
      get(
        `/subscribed-category-list?index=0&offset=1000&keyword=${search || ''}`
      )
  });
};

export const useGetStudioProducts = (data) => {
  const { search = '', cb } = data;
  return useQuery({
    queryKey: ['studio-products', { search: search || '' }],
    queryFn: () =>
      get(`/prompt-studio-list?index=0&offset=1000&keyword=${search || ''}`)
  });
};

export const useGetSpecificStudioProduct = (data) => {
  const { prompt_id, cb } = data;
  return useQuery({
    queryKey: ['studio-product', prompt_id],
    queryFn: () =>
      get(`/company/custom-prompt-details?prompt_id=${prompt_id || ''}`)
  });
};

export const useSubscribeProduct = (cb) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/subscribe-category', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['studio-products', { search: '' }]);
      queryClient.invalidateQueries([
        'studio-products-subscribe',
        { search: '' }
      ]);
      cb();
      toast.success(response?.message);
    }
  });
};

export const useUnsubscribeProduct = (cb) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/unsubscribe-category', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['studio-products', { search: '' }]);
      queryClient.invalidateQueries([
        'studio-products-subscribe',
        { search: '' }
      ]);
      cb();
      toast.success(response?.message);
    }
  });
};

export const useExecutePromptStudio = ({ cb, id, title }) => {
  const router = useRouter();
  const {
    mutate: addconversation,
    isLoading: loading,
    status
  } = useAddConversation({
    id,
    message: []
  });
  const { data } = useGetHyperParameters({ id });

  const { values: contextHyperparameters } = useContext(HyperParametersContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: (values) => {
      return postFormData('/prompt-chat', values);
    },
    onMutate: () => {
      return { startTime: performance.now() };
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (res, values, context) => {
      const inference_time = getInferenceTime(context.startTime);
      if (
        typeof res.response === 'string' ||
        res?.response === null ||
        res?.response === 'Invalid Model Slug' ||
        (!!res?.response?.choices?.length &&
          res?.response?.choices[0]?.message?.content === 'Resource not found')
      ) {
        toast.error(
          res?.response?.choices?.length
            ? res?.response?.choices[0]?.message?.content
            : res?.response || 'Prompt failed'
        );
        return;
      }

      res.post_challange.hyperparameters = id
        ? {
            ...data?.hyper_parameters,
            context_chaining: !imageModel(values.model)
          }
        : {
            ...contextHyperparameters,
            context_chaining: !imageModel(values.model)
          };

      addconversation(replaceContentWithUserRole(res, title, inference_time));
    }
  });

  useEffect(() => {
    if (status === 'success') {
      cb();
    }
  }, [status, cb]);

  return { mutate, isLoading: isLoading || loading };
};

export const useGetCategories = ({ search_query, page }) => {
  const index =
    (parseInt(page || 1) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);

  return useQuery({
    queryKey: ['categories', { page: parseInt(page), search_query }],
    queryFn: () =>
      get(
        `/company/prompt-category-list?index=${index}&offset=${
          process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15
        }&keyword=${search_query}`
      ),
    keepPreviousData: true
  });
};

export const useAddCategory = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => postFormData('/company/prompt-category', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      callback();
      toast.success('Category added successfully');
      queryClient.invalidateQueries(['categories']);
    }
  });
};

export const useUpdateCategory = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => put('/company/prompt-category', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      callback();
      toast.success('Category updated successfully');
      queryClient.invalidateQueries(['categories']);
      queryClient.invalidateQueries(['/company/custom-prompt-all']);
    }
  });
};

export const useDeleteCategory = ({ callback }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) =>
      del(`/company/prompt-category?category_id=${values}`),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      callback();
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries(['categories']);
    }
  });
};

export const useCompanyStudioProducts = (data) => {
  const { search = '', cb } = data;
  return useQuery({
    queryKey: ['/company/custom-prompt-all', { search: search || '' }],
    queryFn: () =>
      get(
        `/company/custom-prompt-all?index=0&offset=1000&keyword=${search || ''}`
      )
  });
};

export const useAddStudioProduct = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => postFormData('/company/custom-prompt', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      callback();
      toast.success('Prompt added successfully');
      queryClient.invalidateQueries(['/company/custom-prompt-all']);
    }
  });
};

export const useUpdateProduct = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => putFormData('/company/custom-prompt', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      callback();
      toast.success('Prompt updated successfully');
      queryClient.invalidateQueries(['/company/custom-prompt-all']);
    }
  });
};

export const useDeleteProduct = ({ callback }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => del(`/company/custom-prompt?prompt_id=${values}`),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['/company/custom-prompt-all']);
      callback();
      toast.success('Prompt deleted successfully');
    }
  });
};
