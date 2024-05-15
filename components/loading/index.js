import PLogo from '@/assets/CustomIcons/PLogo';
import { pxToRem } from '@/utils/theme';
import { Box, styled, useTheme } from '@mui/material';

const LoadingPage = () => {
  const theme = useTheme();
  return (
    <>
      <Wrapper>
        <LogoBox>
          <PLogo width={pxToRem(27)} height={pxToRem(27)} />
        </LogoBox>
        <Box sx={{ height: '30px', display: 'flex', alignItems: 'center' }}>
          <div className='snippet' data-title='dot-falling'>
            <div className='stage'>
              <div className='dot-falling'></div>
            </div>
          </div>
        </Box>
      </Wrapper>
    </>
  );
};

export default LoadingPage;

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider + 20}`,
  background:
    'linear-gradient(180deg, rgba(39, 93, 113, 0.10) 0%, rgba(39, 93, 113, 0.10) 100%)',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem 0.5rem '
  }
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  placeContent: 'center',
  display: 'grid',
  [theme.breakpoints.down('sm')]: {
    width: '26.25px',
    height: '26.25px'
  }
}));
