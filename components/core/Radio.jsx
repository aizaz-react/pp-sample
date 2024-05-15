import { Box, styled } from '@mui/material';
import React from 'react';

const CustomRadio = ({ borderStyle, checkedStyle }) => {
  return (
    <Main
      sx={{
        borderRadius: '2rem',
        ...borderStyle
      }}
    >
      <Box sx={{ flex: 1, borderRadius: '2rem', ...checkedStyle }} />
    </Main>
  );
};

export default CustomRadio;

const Main = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer'
}));
