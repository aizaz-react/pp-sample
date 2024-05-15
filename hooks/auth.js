import { get, post } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export const useRegister = () => {
  const { mutate: register, isLoading: loading } = useMutation({
    mutationFn: (values) => post('/register_user', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => toast.success(response.message)
  });
  return { register, loading };
};

export const useGoogleAuthRegister = () => {
  const router = useRouter();
  const { mutate: googleAuth, isLoading: googleLoading } = useMutation({
    mutationFn: (values) => post('/auth/google/register', { token: values }),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: ({ tokens: response }) => {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const authTokenString = JSON.stringify({ accessToken, refreshToken });
      Cookies.set('authToken', authTokenString);
      if (
        response?.company_info?.has_company ||
        response?.company_info?.is_manager
      )
        return router.push('/chat');
      if (!response?.company_info?.domain_is_public)
        return router.push('/auth/option');
      return router.push('/mian');
    }
  });
  return { googleAuth, googleLoading };
};

export const useAzureAuthRegister = () => {
  const router = useRouter();
  const { mutate: azureAuth, isLoading: azureLoading } = useMutation({
    mutationFn: (values) => post('auth/azure-ad/register', { token: values }),
    onError: (err) => {
      signOut({ redirect: false });
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: ({ tokens: response }) => {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const authTokenString = JSON.stringify({ accessToken, refreshToken });
      Cookies.set('authToken', authTokenString);
      if (
        response?.company_info?.has_company ||
        response?.company_info?.is_manager
      )
        return router.push('/chat');
      if (!response?.company_info?.domain_is_public)
        return router.push('/auth/option');
      return router.push('/mian');
    }
  });
  return { azureAuth, azureLoading };
};

export const useRegisterVerify = (id) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['emailValidate'],
    queryFn: () => get(`/auth/verify-email/?key=${id}`),
    onSuccess: (response) => {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const authTokenString = JSON.stringify({ accessToken, refreshToken });
      Cookies.set('authToken', authTokenString);
      if (response?.user?.is_superuser)
        return toast.error('Un Authorized User');
      if (
        response?.company_info?.has_company ||
        response?.company_info?.is_manager
      )
        return router.push('/chat');
      if (!response?.company_info?.domain_is_public)
        return router.push('/auth/option');
      return router.push('/chat');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
      Cookies.set('authToken', null);
    },
    retry: false
  });
  return { data, isLoading, isError };
};

export const useGoogleAuth = () => {
  const router = useRouter();
  const { mutate: googleAuth, isLoading: googleLoading } = useMutation({
    mutationFn: (values) => post('/auth/google/login', { token: values }),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: ({ tokens: response }) => {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const authTokenString = JSON.stringify({ accessToken, refreshToken });
      Cookies.set('authToken', authTokenString);
      if (response?.user?.is_superuser)
        return toast.error('Un Authorized User');
      if (
        response?.company_info?.has_company ||
        response?.company_info?.is_manager
      )
        return router.push('/chat');
      if (response?.company_info?.domain_is_public)
        return router.push('/auth/info/1');
      if (!response?.company_info?.domain_is_public)
        return router.push('/auth/option');
    }
  });
  return { googleAuth, googleLoading };
};
export const useAzureAuth = () => {
  const router = useRouter();
  const { mutate: azureAuth, isLoading: azureLoading } = useMutation({
    mutationFn: async (values) =>
      post('/auth/azure-ad/login', { token: values }),
    onSuccess: ({ tokens: response }) => {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const authTokenString = JSON.stringify({ accessToken, refreshToken });
      Cookies.set('authToken', authTokenString);
      if (response?.user?.is_superuser)
        return toast.error('Un Authorized User');
      if (
        response?.company_info?.has_company ||
        response?.company_info?.is_manager
      )
        return router.push('/chat');
      if (response?.company_info?.domain_is_public)
        return router.push('/auth/info/1');
      if (!response?.company_info?.domain_is_public)
        return router.push('/auth/option');
    },
    onError: (error) => {
      signOut({ redirect: false });
      toast.error(
        error?.response?.data?.message ||
          'An error occurred during authentication'
      );
    }
  });

  return { azureAuth, azureLoading };
};

export const useSocialSignIn = ({ isSignUp }) => {
  const { azureAuth, azureLoading } = useAzureAuth();
  const { azureAuth: register, azureLoading: isRegistering } =
    useAzureAuthRegister();
  const { data, status } = useSession();
  const isLoading = status === 'loading' || azureLoading || isRegistering;
  const access_token = data?.access_token;
  const isAccessTokenReceived = useRef(false);

  useEffect(() => {
    const isInitiated = Cookies.get();
    if (access_token && !isAccessTokenReceived.current) {
      if (isSignUp) {
        register(access_token);
      } else {
        azureAuth(access_token);
      }
      isAccessTokenReceived.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

  return {
    isLoading
  };
};
export const useLogin = () => {
  const { mutate: login, isLoading: loading } = useMutation({
    mutationFn: (values) => post('/login', values),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => toast.success(response.message)
  });
  return { login, loading };
};

export const useLoginVerify = (id) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['emailValidate'],
    queryFn: () => get(`/auth/verify-login/?key=${id}`),
    onSuccess: ({ tokens: response }) => {
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      const authTokenString = JSON.stringify({ accessToken, refreshToken });
      Cookies.set('authToken', authTokenString);
      if (response?.user?.is_superuser)
        return toast.error('Un Authorized User');
      if (
        response?.company_info?.has_company ||
        response?.company_info?.is_manager
      )
        return router.push('/chat');
      if (!response?.company_info?.domain_is_public)
        return router.push('/auth/option');
      return router.push('/mian');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
      Cookies.set('authToken', null);
    },
    retry: false
  });
  return { data, isLoading, isError };
};

export const useForgetPassword = () => {
  const queryClient = useQueryClient();
  const { mutate: forgetPassword, isLoading: loading } = useMutation({
    mutationFn: (values) => post('/auth/forgot_password', values),
    onError: (err) => {
      toast.success('Email sent successfully');
    },
    onSuccess: (response) => {
      toast.success('Email sent successfully');
      queryClient.invalidateQueries(['resetValidate']);
    }
  });
  return { forgetPassword, loading };
};

export const useResetPassword = () => {
  const router = useRouter();
  const { mutate: resetPassword, isLoading: loading } = useMutation({
    mutationFn: ({ values }) => {
      return post('/auth/reset_password', values);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      Cookies.set('authToken', '');
      router.push('/auth/login');
    }
  });
  return { resetPassword, loading };
};

export const useValidateResetpasswordLink = (token) => {
  const router = useRouter();
  const { data, loading, isError } = useQuery({
    queryKey: ['resetValidate'],
    queryFn: () => get(`/auth/validate_link/${token}`),
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
      router.push('/auth/login');
    },
    onSuccess: (response) => {
      Cookies.set('authToken', JSON.stringify(response));
    },
    retry: false
  });
  return { data, loading, isError };
};
