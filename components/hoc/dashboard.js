'use client';
import OverviewIcon from '@/assets/CustomIcons/OverviewIcon';
import PaymentMethodIcon from '@/assets/CustomIcons/PaymentMethodIcon';
import UserMngmnt from '@/assets/CustomIcons/UserMngmnt';
import {
  Box,
  Stack,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import ResponsiveDrawer from '../core/Drawer';
import Navbar from '../core/Navbar';
import CompanyModal from '../core/modals/CompanyModal';

const drawerList = [
  {
    title: 'Dashboard',
    Icon: () => <OverviewIcon />,
    link: '/dashboard/overview'
  },
  {
    title: 'Manage Users',
    Icon: () => <UserMngmnt />,
    link: '/dashboard/users'
  },
  {
    title: 'Payment Management',
    Icon: () => <PaymentMethodIcon />,
    link: '/dashboard/payment'
  }
];

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isToggleScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const toggleDrawer = () => {
    if (isToggleScreen) setMobileOpen((prev) => !prev);
  };

  const pathname = usePathname();
  const handleClose = useCallback(() => setOpenCompany(false), []);


  return (
    <>
      <Navbar mobileOpen={mobileOpen} setMobileOpen={toggleDrawer} />
      <Toolbar />
      <Stack direction={'row'}>
        <ResponsiveDrawer
          isChat={false}
          mobileOpen={mobileOpen}
          setMobileOpen={toggleDrawer}
        >
          <Stack mt={7} gap={'1.5rem'} alignItems={'center'}>
            <Stack gap={'.5rem'} width={'100%'}>
              {drawerList.map(({ title, Icon, link }, index) => (
                <DrawerListItem
                  selected={pathname.includes(link)}
                  onClick={() => toggleDrawer()}
                  key={index}
                >
                  <Link href={link} className='text-decoration-none'>
                    <Icon />
                    <Typography
                      component={'p'}
                      variant='body2'
                      color={'inherit'}
                    >
                      {title}
                    </Typography>
                  </Link>
                </DrawerListItem>
              ))}
            </Stack>
          </Stack>
        </ResponsiveDrawer>
        {children}
        <CompanyModal open={openCompany} handleClose={handleClose} />
      </Stack>
    </>
  );
};

export default Dashboard;

const DrawerListItem = styled(Box)(({ selected, theme }) => ({
  '& a': {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    padding: '.5rem',
    borderRadius: '10px',
    background: selected && '#275D7140',
    width: '100%',
    transition: '0.1s background-color linear,0.1s color linear',
    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
    '&:hover': {
      background: '#275D7140',
      color: theme.palette.primary.main
    }
  }
}));
