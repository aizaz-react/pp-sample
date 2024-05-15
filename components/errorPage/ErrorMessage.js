'use client';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import StyledAuth from '@/components/auth/StyledAuth';
import Button from '@/components/core/Button';
import ErrorLogo from '@/assets/CustomIcons/ErrorLogo';
import { useRouter } from 'next/navigation';

const ErrorMessage = () => {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const onClickHandler = () => {
    router.push('/auth/login');
  };
  return (
    <StyledAuth.FormSection alignItems={'center'} spacing={4}>
      <StyledAuth.IconSection>
        <ErrorLogo width={matches && '60'} height={matches && '60'} />
      </StyledAuth.IconSection>
      <Typography variant='heading1' component={'h1'}>
        Link Expired !!
      </Typography>
      <Typography variant='body1' component={'p'} textAlign={'center'}>
        It is imperative that we initiate the retransmission of the
        authentication email to facilitate your ability to forget your password.
      </Typography>
      <Button
        variant='contained'
        sx={{ width: '80%', marginTop: 'auto', marginBottom: '40px' }}
        onClick={() => onClickHandler()}
      >
        Go to Login
      </Button>
    </StyledAuth.FormSection>
  );
};

export default ErrorMessage;
