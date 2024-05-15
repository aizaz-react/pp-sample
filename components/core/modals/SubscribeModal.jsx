import Button from '@/components/core/Button';
import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { RoundedDialog } from '../../styled/core';

const SubscribeModal = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <RoundedDialog
      open={props.open}
      onClose={props.handleClose}
      sx={{
        '& .MuiPaper-root': {
          padding: matches ? '1rem 1rem' : '2rem 2.5rem'
        }
      }}
      PaperProps={{
        sx: {
          minWidth: 280,
          borderRadius: 2
        }
      }}
    >
      <Stack marginBottom='10px' gap={'1rem'}>
        <Stack gap={'1rem'} direction={'row'} alignItems={'center'}>
          <Avatar
            alt={props.title}
            src={'data:image/png;base64, ' + props.logo}
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant='subHeading1' component={'h1'}>
            {props.title}
          </Typography>
        </Stack>
        <Typography variant='body2' component={'p'} width={'85%'} my={'1rem'}>
          {props.message}
        </Typography>
        <Toolbar>
          <Button
            sx={{
              borderRadius: '2rem',
              background: `${theme.palette.secondary.main}30`
            }}
            fullWidth
            color={'secondary'}
            variant={'contained'}
            padding='10px 0px'
            onClick={props.handleClose}
          >
            <Typography variant={'body1'} textTransform={'capitalize'}>
              Cancel
            </Typography>
          </Button>
          <Button
            sx={{ borderRadius: '2rem' }}
            fullWidth
            onClick={props.confirm}
            variant={'contained'}
            padding='10px 0px'
            loading={props.loading}
            loadingSize={matches ? 13 : tablet ? 17 : 23}
          >
            <Typography variant={'body1'}>{props.buttonText}</Typography>
          </Button>
        </Toolbar>
      </Stack>
    </RoundedDialog>
  );
};

export default SubscribeModal;

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));
