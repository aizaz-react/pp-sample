import { get, post } from '@/utils/axios';
import { getUserDetails } from '@/utils/globalFuntions';
import { useStripe } from '@stripe/react-stripe-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetCard = () => {
  return useQuery({
    queryKey: ['payment'],
    queryFn: () => get(`/get-user-card-info`)
  });
};

export const useGetStats = () => {
  return useQuery({
    queryKey: ['paymentStats'],
    queryFn: () => get(`/get-products-stats`)
  });
};

export const useGetTransactionHistory = ({ page, id }) => {
  const index =
    (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);
  const offset = process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15;
  const user = getUserDetails();
  const tenant_id = user.tenant_id;

  return useQuery({
    queryFn: () =>
      get(
        `/transaction-history&index=${index}&offset=${offset}&tenant_id=${tenant_id}`
      )
  });
};

export const useAddPayment = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => {
      return post(`/add-payment-method`, values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['payment']);
      toast.success(response.message);
      callback();
    }
  });
};
export const usePaymentIntent = () => {
  return useQuery({
    queryKey: ['payment-intent'],
    queryFn: () => get(`/payment-intent`)
  });
};
export const useCreatePaymentMethod = () => {
  const stripe = useStripe();
  return useMutation({
    mutationFn: (cardNumber) => {
      return stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber
      });
    }
  });
};
