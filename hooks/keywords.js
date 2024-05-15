import { del, get, post, put, putFormData } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAddKeywordList = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/company/add-keyword-list', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['customKeywords']);
      callback();
    }
  });
};

export const useUpdateKeywordList = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put('/company/edit-keyword-list', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['customKeywords']);
      callback();
    }
  });
};

export const useChangeStatusKeywordList = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put('/company/enable-keyword-list', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['customKeywords']);
    }
  });
};

export const useUpdateSecuritylevel = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return putFormData('/company/change-security', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['entityKeywords']);
    }
  });
};

export const useGetKeywords = () => {
  return useQuery({
    queryKey: ['entityKeywords'],
    queryFn: () => get('/get-keyword')
  });
};

export const useGetCustomKeywords = (query) => {
  return useQuery({
    queryKey: ['customKeywords', query],
    queryFn: () =>
      get(`/company/get-keyword-list?index=0&offset=&name=${query.search}`)
  });
};
export const useDeleteCustomKeywords = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => {
      return del(`/company/delete-keyword-list?id=${id}`);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(['customKeywords']);
      callback();
    }
  });
};
