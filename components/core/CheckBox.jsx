import { pxToRem } from '@/utils/theme';
import { Box, styled } from '@mui/material';
import React from 'react';

const CheckBox = ({ borderColor, check, onChange }) => {
  return (
    <Main sx={{ borderColor: `${borderColor}99` }} onClick={onChange}>
      <Box sx={{ bgcolor: check && borderColor, flex: 1 }} />
    </Main>
  );
};

export default CheckBox;

const Main = styled(Box)(({ theme }) => ({
  width: '1.8rem',
  height: '1.8rem',
  border: `${pxToRem(2)} solid`,
  borderRadius: pxToRem(4),
  display: 'flex',
  padding: pxToRem(4),
  cursor: 'pointer'
}));
