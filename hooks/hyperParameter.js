import { get, put } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const defaultParameters = {
  context_chaining: true,
  chain_limit: 5,
  temperature: 0.8,
  token_limit: 256,
  top_k: 40,
  top_p: 0.8
};

export const useUpdateParameters = ({ id, callback = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return put(`/conversations/metadata`, { conversation_id: id, ...values });
    },
    onMutate: (values) => {
      const previousData = queryClient.getQueryData(['hyperParameters', id]);
      queryClient.setQueryData(['hyperParameters', id], (old) => ({
        ...old,
        ...values
      }));
      return { previousData };
    },
    onError: (err, _, context) => {
      toast.error(err?.response?.data?.message || err.message);
      queryClient.setQueryData(['hyperParameters', id], context.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['hyperParameters', id]);
      queryClient.invalidateQueries(['conversation']);
      callback();
    }
  });
};

export const useGetHyperParameters = ({
  id,
  callback = () => {},
  isFetched = null
}) => {
  const queryClient = useQueryClient();
  const subscribedProducts = queryClient.getQueryData([
    'subscribe Products',
    { search: '' }
  ]);
  const url = !!id
    ? `/conversations/metadata?conversation_id=${id}`
    : '/company/get-parameters';
  const checkProduct = (resp) =>
    !subscribedProducts?.result?.some((item) => item.slug === resp?.product);
  const query = useQuery({
    queryKey: ['hyperParameters', id],
    queryFn: () => get(url),
    onSuccess: (resp) => {
      const isNotExist = checkProduct(resp);
      const newSlug = subscribedProducts?.result?.[0].slug;
      callback(resp, isNotExist, newSlug);
    },

    enabled: isFetched === null ? true : isFetched
  });

  return query;
};
