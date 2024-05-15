import { get } from "@/utils/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import queryString from "query-string";
import {
  LOGS_LEVEL,
  LOG_TYPE_CHOICES,
  ACTION_TYPE_CHOICES,
  headers,
} from "@/utils/constants";

export const useGetLogs = ({ page, ...filters }) => {
  const query = queryString.stringify({
    ...filters,
    index: (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15),
    offset: process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15,
  });
  return useQuery({
    queryKey: ["logs", { page, ...filters }],
    queryFn: () => get(`/get-logs/?${query}`),
  });
};

export const useCsvLogs = ({ level, type, action, start_date, end_date }) => {
  return useMutation({
    mutationFn: () =>
      get(
        `/get-logs?${`index=${0}&offset=${100000}`}&level=${level}&type=${type}&action=${action}&start_date=${start_date}&end_date=${end_date}`
      ),

    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (data) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const todayFormat = moment(today).format("YYYY-MM-DD");
      const yesterdayFormat = moment(yesterday).format("YYYY-MM-DD");
      const start_date_format =
        start_date && moment.unix(start_date).format("YYYY-MM-DD");
      const end_date_format =
        end_date && moment.unix(end_date).format("YYYY-MM-DD");

      const csvRows = data.result.map((row) => [
        row.record_id,
        LOGS_LEVEL[row.level],
        row.timestamp,
        LOG_TYPE_CHOICES[row.type],
        row.model_id,
        row.model_name,
        ACTION_TYPE_CHOICES[row.action],
      ]);

      const csvData = [headers, ...csvRows];

      const csvContent = csvData.map((row) => row.join(",")).join("\n");

      const Csv = new Blob([csvContent], { type: "text/csv;charset=utf-8," });

      const fileUrl = URL.createObjectURL(Csv);

      const link = document.createElement("a");

      link.href = fileUrl;

      link.download =
        `${start_date_format || yesterdayFormat} to ${
          end_date_format || todayFormat
        }` +
        "logs" +
        ".csv";

      link.click();
    },
  });
};
