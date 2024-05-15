import React from 'react';
import EditIcon from '@/assets/CustomIcons/EditIcon';
import { IconButton } from '@mui/material';
import InfoLogo from '@/assets/CustomIcons/InfoLogo';
import DeleteIcon from '@/assets/CustomIcons/DeleteIcon';

const actions = {
  edit: {
    icon: <EditIcon />,
    color: 'secondary'
  },
  delete: {
    icon: <DeleteIcon />,
    color: 'warning'
  },
  info: {
    icon: <InfoLogo />,
    color: 'warning'
  }
};
const ActionButton = ({ onClick, action, disabled, sx, children }) => {
  return (
    <>
      <IconButton
        onClick={onClick}
        color={actions[action].color}
        disabled={disabled}
        sx={{
          ...sx,
          '& svg': {
            width: '16px',
            height: 'auto'
          }
        }}
      >
        {children}
        {actions[action]?.icon}
      </IconButton>
    </>
  );
};

export default ActionButton;
