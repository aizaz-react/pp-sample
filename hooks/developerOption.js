import { get, post, put } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetCompanyDeveloperOption = ({ page, search }) => {
  const index = (parseInt(page) - 1) * 15;
  return useQuery({
    queryKey: ['developerOption', { page: parseInt(page), search }],
    queryFn: () =>
      get(
        `/company/api-key-list?${`index=${index}&offset=${
          process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15
        }`}&search_query=${search}`
      ),
    keepPreviousData: true
  });
};

export const useCreateDeveloperKey = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/company/create-api-key', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption']);
      toast.success('Developer key added successfully');
      callback();
    }
  });
};

export const useActivateDeveloperOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put('/company/user/developer', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption', 'me']);
    }
  });
};

export const useRegenerateApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return put('/company/regenerate-api-key');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption', 'me']);
      toast.success('Api key has been re-generated successfully');
    }
  });
};

export const useGetMyDeveloperOption = () => {
  return useQuery({
    queryKey: ['developerOption', 'me'],
    queryFn: () => get(`/company/my-api-key`),
    keepPreviousData: true
  });
};

export const useUpdateDeveloperOptionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put('/company/user/status', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption']);
    }
  });
};

export const useDeleteDeveloperOption = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => post('/company/api-key-delete', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption', 'me']);
      queryClient.invalidateQueries(['developerOption']);
      toast.success('Uer API Key key deleted successfully');
      callback();
    }
  });
};
export const useRegenerateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ target_user }) =>
      put('/company/regenerate-api-key', { target_user }),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption', 'me']);
      queryClient.invalidateQueries(['developerOption']);
      toast.success('User API key regenerated successfully');
    }
  });
};

export const useUsersApiStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => put('/company/api-key-status', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['developerOption']);
    }
  });
};
