import ClearChatIcon from '@/assets/CustomIcons/ClearChatIcon';
import { RoundedDialog } from '@/components/styled/core';
import { Stack, Typography } from '@mui/material';
import Button from '../Button';

const ClearChatModal = (props) => {
  const onClose = () => {
    props.handleClose();
  };
  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: 270,
          borderRadius: 2
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem'>
        <Stack
          spacing='10px'
          padding={'1rem'}
          borderRadius={'16px'}
          backgroundColor={'secondaryLight.main'}
          width={'fit-content'}
        >
          <ClearChatIcon />
        </Stack>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='subHeading1' component={'h1'}>
            Are you sure ?
          </Typography>
          <Typography variant='body2' component={'p'}>
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </Typography>
        </Stack>

        <Stack direction='row' gap={'20px'} marginBottom='5px'>
          <Button
            color={'secondary'}
            variant='contained'
            padding='10px 0px'
            type='button'
            sx={{
              flex: 1,
              fontSize: '16px',
              backgroundColor: 'rgba(39, 93, 113, 0.1)'
            }}
            onClick={onClose}
          >
            <Typography variant='body1' sx={{ color: 'white' }}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            onClick={props.clearChat}
            sx={{ flex: 1, fontSize: '16px' }}
            padding='10px 0px'
          >
            <Typography variant='body1' sx={{ color: 'black' }}>
              Confirm
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default ClearChatModal;
