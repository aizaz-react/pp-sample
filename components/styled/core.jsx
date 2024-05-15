import { pxToRem } from '@/utils/theme';

import { Box, Dialog, Slider, styled, Switch } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const PaginationSection = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  '.MuiButtonBase-root.MuiPaginationItem-root': {
    border: '1px solid #9B9B9B',
    '&.Mui-selected': {
      background:
        'linear-gradient(0deg, rgba(15,56,64,1) 43%, rgba(15,15,19,1) 133%)'
    }
  }
});

export const RoundedDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: theme.palette.background.default,
    padding: `${pxToRem(50)} ${pxToRem(30)}`,
    border: '2px solid rgba(191, 191, 191, 0.3)',
    boxShadow: '0px 10px 65px rgba(14, 36, 64, 0.3)',
    borderRadius: '30px',
    width: '100%'
  },
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(3px)'
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiPaper-root': {
      padding: `${pxToRem(25)} ${pxToRem(15)}`
    }
  }
}));

export const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: theme.palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.background.paper,
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: 'blue',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.primary.main
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

export const CustomSlider = styled(Slider)({
  height: 2,
  color: '#E39E36',
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 14,
    width: 14,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme, ...props }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: props.color
  },
  [`& .${tooltipClasses.tooltip}`]: {
    padding: props.tooltippadding,
    boxShadow: props.shadow || '',
    backgroundColor: props.color,
    ...theme.typography.body2
  }
}));

export const CardWrapper = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1rem'
}));
