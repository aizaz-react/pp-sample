import React from 'react';
import { RoundedDialog } from '../../styled/core';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import { Close } from '@mui/icons-material';

const LogsInfoModal = (props) => {
  const { selected } = props;
  const onClose = () => {
    props.handleClose();
  };

  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      maxWidth={'md'}
      sx={{
        '& .MuiPaper-root': {
          padding: '2rem'
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          padding: '1rem'
        }
      }}
    >
      <Stack width={'100%'} gap={'2rem'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='subHeading1'>More Details</Typography>
          <CloseButton
            onClick={props?.handleClose}
            sx={{ px: '.3rem', cursor: 'pointer' }}
          >
            <Close sx={{ color: '#000', fontSize: '1rem', mt: '.2rem' }} />
          </CloseButton>
        </Stack>
        <Divider />
        <ModalInfoWrapper>
          <Stack width='100%' direction={'row'} alignItems={'center'}>
            <Heading>Prompt</Heading>
            <Description>{selected?.prompt}</Description>
          </Stack>
          <Stack width='100%' direction={'row'} alignItems={'center'}>
            <Heading>IP Address</Heading>
            <Description>{selected?.ip_address}</Description>
          </Stack>
        </ModalInfoWrapper>
        <ModalInfoWrapper>
          <Stack width='100%' direction={'row'} alignItems={'center'}>
            <Heading>Description</Heading>
            <Description>{selected?.description}</Description>
          </Stack>
          <Stack width='100%' direction={'row'} alignItems={'center'}>
            <Heading>User uuid</Heading>
            <Description>{selected?.user_uuid}</Description>
          </Stack>
        </ModalInfoWrapper>
        <ModalInfoWrapper>
          <Stack width='100%' direction={'row'} alignItems={'center'}>
            <Heading>Username</Heading>
            <Description>{selected?.username}</Description>
          </Stack>

          <Stack width='100%' direction={'row'} alignItems={'center'}>
            <Heading>Data Name</Heading>
            <Description></Description>
          </Stack>
        </ModalInfoWrapper>
      </Stack>
    </RoundedDialog>
  );
};

export default LogsInfoModal;

const CloseButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  padding: '.2rem',
  border: 'none',
  borderRadius: '3px'
}));

const Heading = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  minWidth: '7rem',
  ...theme.typography?.subHeading2,
  alignSelf: 'flex-start'
}));

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  ...theme.typography?.body1,
  alignSelf: 'flex-start',
  marginTop: '1px',
  wordBreak: 'break-word'
}));

const ModalInfoWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1rem'
}));
