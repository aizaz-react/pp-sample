'use client';
import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export const tablist = [
  { name: 'My Vault', link: '/dashboard/vectorVault' },
  { name: 'Shared Vault', link: '/dashboard/vectorVault/sharedVault' }
];

const VectorVaultHOC = ({ children }) => {
  const pathname = usePathname();
  const { vaultId, sharedId } = useParams();
  const theme = useTheme();
  return (
    <MainBox className='VectorVaultHOC'>
      {!(sharedId || vaultId) ? (
        <Main className='Main_Styled_Tabs'>
          <SliderWrapper>
            {tablist.map(({ name, link }) => (
              <Link
                key={link}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '5px',
                  backgroundColor:
                    pathname === link && theme.palette.primary.main,
                  textDecoration: 'none'
                }}
                href={link}
              >
                <Typography
                  variant={'body2'}
                  sx={{
                    color:
                      pathname === link
                        ? theme.palette.background.default
                        : theme.palette.text.primary
                  }}
                >
                  {name}
                </Typography>
              </Link>
            ))}
          </SliderWrapper>
        </Main>
      ) : (
        ''
      )}
      {children}
    </MainBox>
  );
};
export default VectorVaultHOC;

const Main = styled(Box)(({ theme }) => ({
  width: 'calc(100vw - 300px)',
  margin: '1rem 0rem 0rem 0rem',
  padding: '1rem 2rem 0rem',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
    width: '-webkit-fill-available'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
    width: '-webkit-fill-available',
    paddingBottom: '0px'
  }
}));

const MainBox = styled(Stack)(({ theme }) => ({
  gap: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '-webkit-fill-available'
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
