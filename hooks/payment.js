import { get, post } from '@/utils/axios';
import { getUserDetails } from '@/utils/globalFuntions';
import { useStripe } from '@stripe/react-stripe-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    });
  });
};

export const useGetCard = () => {
  return useQuery({
    queryKey: ['payment'],
    queryFn: () => delay()
  });
};

export const useGetStats = () => {
  return useQuery({
    queryKey: ['paymentStats'],
    queryFn: () => delay()
  });
};

export const useGetTransactionHistory = () => {
  return useQuery({
    queryFn: () => delay()
  });
};

export const useAddPayment = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => delay(),
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
    queryFn: () => delay()
  });
};

export const useCreatePaymentMethod = () => {
  return useMutation({
    mutationFn: () => delay()
  });
};
