import { get } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';

export const useGetChatgptChart = ({ startDate, endDate }) => {
  return useQuery({
    queryKey: ['chatgpt-chart', { startDate, endDate }],
    queryFn: () =>
      get(
        `/conversations/utilization?model_name=1&start_date=${startDate}&end_date=${endDate}`
      )
  });
};

export const useGetStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => get(`/dashboard-stats`)
  });
};
