import { get, putFormData } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => get('/auth/me')
  });
};

export const useUpdateProfile = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return putFormData('/profile/update', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['profile'], (oldData) => ({
        ...oldData,
        profile: { ...oldData.profile, ...response.profile }
      }));
      queryClient.invalidateQueries(['profile']);
      callback();
    }
  });
};
