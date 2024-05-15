import { get, post, put } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetCompanyUsers = (page, search, status) => {
  const index = (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);
  return useQuery({
    queryKey: ['users', { page: parseInt(page), search, status }],
    queryFn: () =>
      get(
        `/company/users?${`index=${index}&offset=${
          process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15
        }`}&search_query=${search}${status ? `&status=${status}` : ''}`
      ),
    keepPreviousData: true
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put('/company/user/status', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });
};

export const useDeleteUser = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put('/company/user/delete', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      callback();
    }
  });
};

export const useInviteUsers = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/company/invite', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['users']);
      callback();
      toast.success('Invitation sent to user');
    }
  });
};
export const useReInviteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ target_user }) => {
      return post('/company/resend-invitation', { target_user });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['users']);
      toast.success(response.message);
    }
  });
};
