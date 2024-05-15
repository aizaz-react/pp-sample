'use client';
import React from 'react';
import { Box, Stack, Typography, styled } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MarketPlaceLayout = ({ children }) => {
  const name = usePathname();

  return (
    <Main>
      <SliderWrapper>
        <Link href={'/dashboard/marketplace'} className='text-decoration-none'>
          <Button
            sx={{
              bgcolor: name === '/dashboard/marketplace' && 'primary.main'
            }}
          >
            <Typography
              variant={'body1'}
              sx={{
                color:
                  name === '/dashboard/marketplace'
                    ? 'background.default'
                    : 'text.primary'
              }}
            >
              Subscribed Products
            </Typography>
          </Button>
        </Link>
        <Link
          href={'/dashboard/marketplace/explore'}
          className='text-decoration-none'
        >
          <Button
            sx={{
              bgcolor: name.includes('marketplace/explore') && 'primary.main'
            }}
          >
            <Typography
              variant={'body1'}
              sx={{
                color: name.includes('marketplace/explore')
                  ? 'background.default'
                  : 'text.primary'
              }}
            >
              Explore Marketplace
            </Typography>
          </Button>
        </Link>
      </SliderWrapper>
      <Box>{children}</Box>
    </Main>
  );
};

export default MarketPlaceLayout;

const Main = styled(Stack)(({ theme }) => ({
  width: 'calc(100vw - 300px)',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
    width: '100%'
  }
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '0.3rem',
  background: theme.palette.background.paper + '20',
  width: 'fit-content',
  gap: '1rem',
  border: '1px solid ' + theme.palette.divider + '20',
  borderRadius: '10px',
  boxShadow: '0px 2px 10px 0px rgba(25, 93, 194, 0.07)'
}));

const Button = styled(Box)(({ theme }) => ({
  padding: '0.6rem 1rem',
  width: 'fit-content',
  cursor: 'pointer',
  boxShadow: '0px 2px 10px 0px rgba(25, 93, 194, 0.07)',
  borderRadius: '8px'
}));
