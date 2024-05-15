'use client';
import { Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react';

const UtilityCard = (props) => {
  const theme = useTheme();
  return (
    <Main
      direction={'row'}
      alignItems={'center'}
      borderTop={`3px solid ${theme.palette[props.color || 'secondary'].main}`}
    >
      <Stack gap={'10px'} flex={1}>
        <Typography variant='body1'>{props.title}</Typography>
        <Typography variant='subHeading1' color={`${props.color}.main`}>
          {props.cardValue}
        </Typography>
      </Stack>
      <IconSection color={props.color}>{props.icon}</IconSection>
    </Main>
  );
};

export default UtilityCard;

const Main = styled(Stack)(({ theme }) => ({
  padding: '1rem 1.5rem',
  borderRadius: '12px',
  background: `linear-gradient(180deg, ${theme.palette.background.paper} -123.94%, ${theme.palette.background.default} 134.51%)`
  // '&:nth-child(odd)': {
  //   borderTop: `3px solid ${theme.palette.primary.main}`
  // },
  // '&:nth-child(even)': {
  //   borderTop: `3px solid ${theme.palette.secondary.main}`
  // }
}));

const IconSection = styled(Stack)(({ theme, color }) => ({
  background: `linear-gradient(90deg, ${theme.palette[color].main} 0%, ${
    theme.palette[color + 'Light'].main
  } 127%)`,
  borderRadius: '50px',
  width: '3rem',
  height: '3rem',
  alignItems: 'center',
  justifyContent: 'center'
}));
