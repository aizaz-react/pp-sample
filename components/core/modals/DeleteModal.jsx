import DeleteLogo from '@/assets/CustomIcons/DeleteLogo';
import StyledAuth from '@/components/auth/StyledAuth';
import Button from '@/components/core/Button';
import {
  Box,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { RoundedDialog } from '../../styled/core';

const DeleteModal = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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
      <Stack spacing='10px' marginBottom='10px' gap={'1rem'}>
        <StyledAuth.IconSection sx={{ width: 'fit-content' }}>
          <DeleteLogo
            width={matches ? '24' : '24'}
            height={matches ? '26' : '26'}
            color={theme.palette.primary.main}
          />
        </StyledAuth.IconSection>
        <Typography variant='subHeading1' component={'h1'}>
          {props.title}
        </Typography>
        <Typography variant='body2' component={'p'} width={'85%'}>
          {props.message}
        </Typography>
        <Toolbar direction={'row'} gap={matches ? '0.5rem' : '1rem'}>
          <Button
            sx={{
              borderRadius: '2rem',
              background: `${theme.palette.background.paper}10`
            }}
            fullWidth
            color='secondary'
            variant={'contained'}
            onClick={props.handleClose}
          >
            <Typography variant='body1'>Cancel</Typography>
          </Button>
          <Button
            sx={{
              borderRadius: '2rem'
            }}
            fullWidth
            onClick={props.confirm}
            variant={'contained'}
            loading={props.loading}
            loadingSize={23}
          >
            <Typography variant='body1'>Delete</Typography>
          </Button>
        </Toolbar>
      </Stack>
    </RoundedDialog>
  );
};

export default DeleteModal;

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
