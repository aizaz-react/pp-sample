import NoData from '@/assets/CustomIcons/NoData';
import { pxToRem } from '@/utils/theme';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/system';

function NoResultFound() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        py: '3rem',
        gap: '1rem'
      }}
    >
      <NoData
        width={matches ? pxToRem(100) : pxToRem(150)}
        height={matches ? pxToRem(100) : pxToRem(150)}
      />
      <NoResult variant={'body1'}>No result found</NoResult>
    </Box>
  );
}

export default NoResultFound;
const NoResult = styled(Typography)(({ theme }) => ({
  ...theme.typography.heading2,
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.4rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem'
  }
}));
