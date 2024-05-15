'use client';
import { theme } from '@/utils/theme';
import { Box, CssBaseline, styled, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClientOptions } from '@/utils/constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Provider = ({ children }) => {
  const [client] = useState(new QueryClient(queryClientOptions));
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          > */}
            <BgLayout>{children}</BgLayout>
          {/* </GoogleOAuthProvider> */}
          <ToastContainer
            position='bottom-right'
            theme='colored'
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            limit={5}
          />
        </ThemeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;

const BgLayout = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default
}));
