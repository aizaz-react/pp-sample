'use client';
import { Box, styled, useTheme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 300;

const ResponsiveDrawer = ({ isChat, mobileOpen, setMobileOpen, children }) => {
  const theme = useTheme();

  return (
    <Box>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={setMobileOpen}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: 'none',
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column'
          },
          bgcolor: 'secondaryLight.main'
        }}
        selected={isChat}
      >
        {children}
      </Drawer>
      <Drawer
        variant='persistent'
        sx={{
          display: { xs: 'none', sm: 'none', md: 'flex' },
          flexDirection: 'column'
        }}
        open
        selected={isChat}
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default ResponsiveDrawer;

const Drawer = styled(MuiDrawer)(({ theme, selected }) => ({
  width: drawerWidth,
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    borderRight: 'none',
    background: !!selected
      ? 'transparent'
      : 'linear-gradient(180deg, #041218 11%, rgba(8, 30, 38, 1) 70.41%, rgba(39, 93, 113, 0.25) 1800%)',
    padding: '1.5rem 10px 1.5rem 15px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '240px',
      padding: '1.5rem 5px 1.5rem 10px'
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: '240px'
  }
}));
