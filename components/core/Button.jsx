import React, { forwardRef, memo } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { ProximaNova } from '@/app/layout';

const StyledButton = forwardRef((props, ref) => {
  return (
    <Button
      ref={ref}
      variant={props.variant || 'text'}
      color={props.color || 'primary'}
      disabled={props.disabled || props.loading}
      type={props.type}
      sx={{ ...props.sx, fontFamily: ProximaNova.style }}
      onClick={props.onClick}
      component={props.component || 'button'}
      htmlFor={props.htmlFor}
      fullWidth={props.fullWidth}
      disableRipple={props.disableRipple}
    >
      {props.loading ? (
        <CircularProgress color='inherit' size={props.loadingSize || 18} />
      ) : (
        props.children
      )}
    </Button>
  );
});

StyledButton.displayName = 'StyledButton';

export default memo(StyledButton);
