import { get, post } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

export const useGetSubscribeProducts = (data) => {
  const { search = '', cb } = data;
  const params = useParams();
  return useQuery({
    queryKey: ['subscribe Products', { search: search || '' }],
    queryFn: () =>
      get(
        `/list-subscribe-product?index=0&offset=1000&search_query=${
          search || ''
        }`
      ),
    onSuccess: (response) => {
      if (cb && !params?.id) {
        const modal = response?.result?.find((product) => product.is_active);
        const storedModal = sessionStorage.getItem('modal');

        if (!storedModal) {
          sessionStorage.setItem('modal', JSON.stringify(modal?.slug));
          cb(modal?.slug || '');
          return;
        }

        if (
          response?.result?.find(
            (product) => product.slug === storedModal && product.is_active
          )
        ) {
          return cb(storedModal);
        }

        sessionStorage.setItem('modal', JSON.stringify(modal.slug));
        cb(modal?.slug || '');
        return;
      }
    }
  });
};

export const useGetUnsubscribeProducts = ({ search = '' }) => {
  return useQuery({
    queryKey: ['unsubscribe Products', { search: search || '' }],
    queryFn: () =>
      get(
        `/list-unsubscribe-product?index=0&offset=1000&search_query=${
          search || ''
        }`
      )
  });
};

export const useSubscribeProduct = (cb) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/subscribe-product', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        'unsubscribe Products',
        {
          search: ''
        }
      ]);
      queryClient.invalidateQueries(['subscribe Products', { search: '' }]);
      cb();
      toast.success(response?.message);
    }
  });
};

export const useUnsubscribeProduct = (cb) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post('/unsubscribe-product', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries([
        'unsubscribe Products',
        {
          search: ''
        }
      ]);
      queryClient.invalidateQueries(['subscribe Products', { search: '' }]);
      cb();
      toast.success(response?.message);
    }
  });
};
