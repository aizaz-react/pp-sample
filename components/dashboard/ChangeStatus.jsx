'use client';
// import { useUpdateUserStatus } from '@/hooks/users';
import { pxToRem } from '@/utils/theme';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Button from '../core/Button';

const ChangeStatus = (props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeStatus = (status) => () => {
    props.changeStatus({ status, id: props.id });
    handleClose();
  };

  return (
    <>
      <Button
        variant='text'
        color={props.status ? 'secondary' : 'error'}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          '&.Mui-disabled': {
            border: 'unset',
            background: `${theme.palette.secondary.main}30`,
            color: theme.palette.secondary.main + 50,

            '& label': {
              color: 'inherit'
            }
          },

          background: `${
            props.status
              ? theme.palette.secondary.main
              : theme.palette.error.main
          }10`,
          width: '8rem',
          borderRadius: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: `${pxToRem(3)} ${pxToRem(3)}`
        }}
      >
        <Typography
          mt={0.1}
          pl={1}
          variant='none'
          component={'label'}
          textTransform={'capitalize'}
          sx={{
            fontSize: '14px !important'
          }}
        >
          {props.status ? 'Active' : 'Deactive'}
        </Typography>
        <Stack height={'24px'} justifyContent={'center'}>
          {props.isLoading ? (
            <CircularProgress size={16} />
          ) : (
            <ArrowDropDownIcon />
          )}
        </Stack>
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'secondaryLight.main'
            }
          }
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          sx={{ fontSize: '14px !important' }}
          onClick={handleChangeStatus(1)}
          disabled={props.status}
        >
          Activate
        </MenuItem>
        <MenuItem
          sx={{ fontSize: '14px !important' }}
          onClick={handleChangeStatus(2)}
          disabled={props.status !== 1}
        >
          Deactivate
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChangeStatus;
