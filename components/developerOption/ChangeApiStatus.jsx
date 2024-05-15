'use client';
import { useUsersApiStatus } from '@/hooks/developerOption';
import { pxToRem } from '@/utils/theme';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Button from '../core/Button';

const ChangeApiStatus = (props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { mutate: changeStatus, isLoading } = useUsersApiStatus();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = () => {
    changeStatus({ target_user: props.user });
    handleClose();
  };

  return (
    <>
      <Button
        variant='text'
        color={props.api_status ? 'secondary' : 'primary'}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          background: `${
            props.api_status
              ? theme.palette.secondary.main
              : theme.palette.primary.main
          }60`,
          minWidth: '8rem',
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '4rem',
          padding: `${pxToRem(3)} ${pxToRem(6)}`
        }}
      >
        <Typography
          variant='none'
          mt={0.05}
          pl={0.5}
          component={'span'}
          textTransform={'capitalize'}
          sx={{ fontSize: '14px' }}
        >
          {props.api_status ? 'Active' : 'Deactive'}
        </Typography>
        <Stack height={'24px'} justifyContent={'center'}>
          {isLoading ? <CircularProgress size={15} /> : <ArrowDropDownIcon />}
        </Stack>
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          sx={{
            fontSize: '14px !important',
            minHeight: 'unset',
            minWidth: '8rem'
          }}
          onClick={handleChangeStatus}
          disabled={props.api_status}
        >
          Activate
        </MenuItem>
        <MenuItem
          sx={{ fontSize: '14px !important', minHeight: 'unset' }}
          onClick={handleChangeStatus}
          disabled={!props.api_status}
        >
          Deactivate
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChangeApiStatus;
