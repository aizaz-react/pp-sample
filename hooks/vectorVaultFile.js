import { get, post, put, del, postFormData } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useSpecificFolderVault = ({ vaultId, page, search }) => {
  const index =
    (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['VVFiles', { vaultId, page, search }],
    queryFn: () =>
      get(
        `/get-vault-files?vault_id=${vaultId}&index=${index}&offset=${
          process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15
        }&search=${search}`
      ),
    keepPreviousData: true,
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    }
  });
};

export const useDeleteVaultFile = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return del(
        `/delete-vault-file?vault_id=${payload.vaultId}&file_id=${payload.fileId}`
      );
    },
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VVFiles']);
      callback();
      toast.success(response.message);
    }
  });
};

export const useEditVaultFile = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paylaod) => put(`/edit-vault-file`, paylaod),
    keepPreviousData: true,
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VVFiles']);
      queryClient.invalidateQueries(['VectorVaultFolders']);
      callback();
      toast.success(response.message);
    }
  });
};

export const useAddUploadFiles = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paylaod) => postFormData(`/add-vault-file`, paylaod),
    keepPreviousData: true,
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VVFiles']);
      queryClient.invalidateQueries(['VectorVaultFolders']);
      callback();
      toast.success(response.message);
    }
  });
};
