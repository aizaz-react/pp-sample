import { get, post, put, del, postFormData } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetVectorVaultFolders = ({ page, search, offset, cb }) => {
  const index =
    (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);
  return useQuery({
    queryKey: ['VectorVaultFolders', { page: parseInt(page), search }],
    queryFn: () =>
      get(
        `/get-all-vaults?index=${index}&offset=${
          offset || process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15
        }&search=${search}`
      ),
    keepPreviousData: true
    // onSuccess: (response) => {
    //   if (cb && sessionStorage.getItem('vault')) {
    //     cb(JSON.parse(sessionStorage.getItem('vault')));
    //   }
    // }
  });
};

export const useAddFolderVault = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => postFormData(`/add-vault-folder`, payload),
    // keepPreviousData: true,
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VectorVaultFolders']);
      callback();
      toast.success(response.message);
    }
  });
};

export const useDeleteFolderVault = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ vaultId }) => {
      return del(`/delete-vault-folder?vault_id=${vaultId}`);
    },
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VectorVaultFolders']);
      callback();
      toast.success(response.message);
    }
  });
};

export const useEditFolderVault = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paylaod) => put(`/edit-vault-folder`, paylaod),
    keepPreviousData: true,
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VectorVaultFolders']);
      callback();
      toast.success(response.message);
    }
  });
};
