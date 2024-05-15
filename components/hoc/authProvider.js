'use client';

import React from 'react';
import StyledAuth from '../auth/StyledAuth';
import FullNameLogo from '@/assets/CustomIcons/FullNameLogo';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const AuthProvider = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <StyledAuth.Main maxWidth='sm'>
      <FullNameLogo width={matches && '155'} height={matches ? '20' : ''} />
      {children}
      <Typography variant='body2' textAlign={'center'}>
        Copyright © Prompt Privacy | Powered by Spark AI
      </Typography>
      <StyledAuth.TriangleIcon />
    </StyledAuth.Main>
  );
};

export default AuthProvider;
