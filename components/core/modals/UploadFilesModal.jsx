import React from 'react';
import { Box, styled, Avatar } from '@mui/material';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useInviteUsers } from '@/hooks/users';

const validationSchema = yup.object({
  target_email: yup
    .string('Enter Email')
    .max(100, 'Email must be maximun 100 characters long.')
    .email('please enter a valid email address')
    .required('Email is required')
});

const UploadFilesModal = (props) => {
  const theme = useTheme();

  const onClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const { mutate: inviteUser, isLoading } = useInviteUsers(onClose);

  const formik = useFormik({
    initialValues: {
      target_email: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      inviteUser({ target_emails: [values.target_email] });
    }
  });

  return (
    <RoundedDialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth={'sm'}
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem' onSubmit={formik.handleSubmit}>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Invite User
          </Typography>
          <Typography variant='body1' component={'p'}>
            Target user must belong to the company
          </Typography>
        </Stack>
        <Stack gap={'1rem'} marginBottom={formik.touched.target_email && formik.errors.target_email ? '5px' : '20px'}>
          <OutlinedInput
            label={'Email'}
            placeholder='xyz@example.com'
            name='target_email'
            value={formik.values.target_email}
            onChange={formik.handleChange}
            error={
              formik.touched.target_email && Boolean(formik.errors.target_email)
            }
            helperText={
              formik.touched.target_email && formik.errors.target_email
            }
            inputStyle={{
              border: '1px solid #275D71',
              color: 'secondary',
              borderColor: 'secondary'
            }}
          />
        </Stack>
        <Stack direction='row' gap={'20px'} marginBottom='5px'>
          <Button
            variant='contained'
            type={'button'}
            padding='10px 0px'
            color='secondary'
            sx={{
              flex: 1,
              backgroundColor: `${theme.palette.secondary.main}30`
            }}
            onClick={onClose}
          >
            <Typography variant='subHeading2' sx={{ color: 'white' }}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            type={'submit'}
            sx={{ flex: 1 }}
            padding='10px 0px'
            loading={isLoading}
          >
            <Typography variant='subHeading2'>Send</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default UploadFilesModal;
