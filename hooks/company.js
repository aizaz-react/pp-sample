import { get, post, putFormData } from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const useCreateCompany = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (values) => {
      return post('/company/create', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      Cookies.set('authToken', JSON.stringify(response.tokens));
      if (response.account_type === 2) return router.push('/auth/info');
      return router.push('/chat');
    }
  });
};

export const useUpdateCompany = (callback) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (values) => {
      return putFormData('/company/update', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      callback(response.company);
    }
  });
};

export const useGetCompany = () => {
  return useQuery({
    queryKey: ['company'],
    queryFn: () => get('/company/info')
  });
};
