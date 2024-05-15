'use client';
import MenuIcon from '@/assets/CustomIcons/MenuIcon';
import PLogo from '@/assets/CustomIcons/PLogo';
import SettingLogo from '@/assets/CustomIcons/SettingLogo';
import UserImageLogo from '@/assets/CustomIcons/UserImageLogo';
import { useGetCompany } from '@/hooks/company';
import { useGetProfile } from '@/hooks/profile';
import { pxToRem } from '@/utils/theme';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FullNameLogo from '../../assets/CustomIcons/FullNameLogo';
import LogoutModal from './modals/LogoutModal';
import ProfileModal from './modals/ProfileModal';

const Navbar = ({ mobileOpen, setMobileOpen, ...props }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const openMenu = Boolean(anchorEl);

  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);
  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const logout = () => {
    signOut({ redirect: false });
    sessionStorage.clear();
    Cookies.remove('authToken');
    router.push('/auth/login');
    queryClient.invalidateQueries();
    queryClient.clear();
  };

  return (
    <Main>
      <MenuIconWrapper direction={'row'} alignItems={'center'}>
        <IconButton
          onClick={setMobileOpen}
          sx={{ color: mobileOpen ? 'secondary.main' : 'common.white' }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ px: pxToRem(4) }}>
          <PLogo width={pxToRem(27)} height={pxToRem(27)} />
        </Box>
      </MenuIconWrapper>
      <LogoWrapper justifyContent={'center'}>
        <FullNameLogo width={'171'} height={'22'} />
      </LogoWrapper>
      <ProfileSection>
        <ProfileDetails onClick={(e) => handleOpenMenu(e)}>
          <StyledAvatar src={''}>{'A'}</StyledAvatar>
          <ProfileInfo>
            <Typography variant='body1' color='secondary.main'>
              {'Test user'}
            </Typography>
          </ProfileInfo>
          <StyledIconButton>
            <ExpandMoreIcon
              sx={{
                color: 'text.secondary',
                fontSize: '1.5rem',
                transform: !!anchorEl ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </StyledIconButton>
        </ProfileDetails>
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={openMenu}
          onClose={handleCloseMenu}
          sx={{
            '& .MuiList-root': {
              padding: '0rem'
            },
            '& .MuiPaper-root': {
              top: '63px !important'
            }
          }}
          PaperProps={{
            elevation: 5,
            sx: {
              overflow: 'hidden',
              filter: 'unset',
              boxShadow: '2px 2px 25px 0px rgba(255, 255, 255, 0.10)',
              bgcolor: 'secondaryLight.main',
              borderRadius: pxToRem(12),
              width: pxToRem(220),
              maxWidth: '100%'
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <EmailBox>
            <Typography variant={'display1'} sx={{ fontWeight: 400 }}>
              {matches ? 'Test user' : 'Signed in as'}
            </Typography>
            <Typography
              variant={'display3'}
              sx={{ fontWeight: 400, fontSize: '.75rem' }}
            >
              {'test@email.com'}
            </Typography>
          </EmailBox>

          <Divider />
          <Box sx={{ margin: '1rem 0' }}>
            <MenuListItem
              onClick={() => {
                handleOpenProfileModal();
                setAnchorEl(null);
              }}
            >
              <ListIcon>
                <UserImageLogo fontSize='small' />
              </ListIcon>
              <ListItemText>
                <Typography variant='body2'>My Profile</Typography>
              </ListItemText>
              <Typography
                color='text.primary'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronRightIcon size={'1.5rem'} />
              </Typography>
            </MenuListItem>
            <MenuListItem
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              <ListIcon>
                <SettingLogo fontSize='small' />
              </ListIcon>
              <ListItemText>
                <Typography variant='body2' color='text.primary'>
                  Manage
                </Typography>
              </ListItemText>
              <Typography
                color='text.primary'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <ChevronRightIcon size={'1.5rem'} />
              </Typography>
            </MenuListItem>
          </Box>
          <MenuListItem
            bgcolor={'true'}
            onClick={() => handleOpenLogoutModal()}
          >
            <ListItemText sx={{ textAlign: 'center' }}>
              <Typography variant='display1' color={'common.black'}>
                Logout
              </Typography>
            </ListItemText>
          </MenuListItem>
        </Menu>
        <LogoutModal
          logout={logout}
          open={openLogoutModal}
          handleClose={handleCloseLogoutModal}
        />
        <ProfileModal
          open={openProfileModal}
          handleClose={handleCloseProfileModal}
          description=''
        />
      </ProfileSection>
    </Main>
  );
};

export default Navbar;

const Main = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(8deg, #275D71 -161.13%, #041218 80.21%)',
  boxShadow: ' 0px 2px 12px 0px rgba(11, 22, 44, 0.05)',
  padding: pxToRem(13),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  zIndex: theme.zIndex.drawer + 1,
  position: 'fixed',
  top: 0,
  width: '100%'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.background.paper}`,
  height: '40px',
  width: '40px',
  color: theme.palette.secondary.main,
  ...theme.typography.subHeading2
}));
const ProfileSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: pxToRem(23)
}));

const ProfileDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: pxToRem(8),
  '&:hover': {
    cursor: 'pointer'
  }
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const EmailBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1rem 1rem 0.5rem 1rem'
}));

const MenuListItem = styled(MenuItem)(({ bgcolor, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  ...(bgcolor === 'true' && {
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  })
}));

const ListIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.text.secondary
}));
const MenuIconWrapper = styled(Stack)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex'
  }
}));
const LogoWrapper = styled(Stack)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));
