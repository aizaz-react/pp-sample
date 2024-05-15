import { pxToRem } from '@/utils/theme';
import { Box, Container, Stack, styled } from '@mui/material';

const Main = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem ',
  [theme.breakpoints.down('md')]: {
    padding: '1rem'
  }
}));

const FormSection = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: `${pxToRem(16)} ${pxToRem(36)}`,
  width: '100%',
  borderRadius: '30px',
  margin: '1rem 0',
  [theme.breakpoints.down('md')]: {
    padding: pxToRem(24)
  },
  [theme.breakpoints.down('sm')]: {
    padding: pxToRem(5),
    border: 'none'
  }
}));

const IconSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondaryLight.main,
  borderRadius: '20px',
  padding: '1rem 1rem 0.8rem'
}));

const TriangleIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '2.5rem',
  left: '0.2rem',
  width: 0,
  height: 0,
  borderLeft: '4.5rem solid transparent',
  borderRight: '4.5rem solid transparent',
  borderBottom: `4.5rem solid ${theme.palette.secondaryLight.main}`,
  transform: 'rotate(45deg)',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const StyledAuth = { FormSection, IconSection, Main, TriangleIcon };

export default StyledAuth;
