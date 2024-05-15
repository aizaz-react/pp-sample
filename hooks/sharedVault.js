import { get, post, put, del, postFormData } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// GET Shared 
export const useGetSharedVaultFolders = ({ page, search, offset, cb }) => {
  const index = (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);
  return useQuery({
    queryKey: ['SharedFolders', { page: parseInt(page), search }],
    queryFn: () =>
      get(
        `/get-shared-vaults?index=${index}&offset=${((offset) || (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15))}&search=${search}`
      ),
    keepPreviousData: true,
    onSuccess: (response) => {
      if (cb) {
      }
    }
  });
};

//DELETE Shared Vault
export const useDeleteSharedFolderVault = (callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return post(`/remove-shared-vault`, payload);
    },
    onError: (err) => {
      callback();
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (responnse) => {
      queryClient.invalidateQueries(['VectorVaultFolders']);
      queryClient.invalidateQueries(['SharedFolders']);
      callback();
      toast.success(response.message);
    }
  });
};

// Add Share Vault
export const useAddShareVault = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return post(`/add-shared-vault`, payload);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['VectorVaultFolders']);
      queryClient.invalidateQueries(['SharedFolders']);
      toast.success(response.message);
    }
});
};


//Shared Files
export const useGetSharedVaultFiles = ({ page, search, offset, cb, vaultId }) => {
  const index = (parseInt(page) - 1) * (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15);
  return useQuery({
    queryKey: ['SharedFolders', { page: parseInt(page), search }],
    queryFn: () =>
      get(`/get-shared-vault-files?vault_id=${vaultId}&search=${search}&index=${index}&offset=${((offset) || (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15))}`),
    keepPreviousData: true,
    onSuccess: (response) => {
      if (cb) {
      }
    }
  });
};

//Remove Shared Vault
export const useRemoveSharedVault = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return post(`/remove-shared-vault`, payload);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['SharedFolders']);
      queryClient.invalidateQueries(['VectorVaultFolders']);
      toast.success(response.message);
    }
  });
};