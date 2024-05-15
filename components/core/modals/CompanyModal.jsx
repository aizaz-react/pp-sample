import React, { memo } from 'react';
import { Box, styled, Avatar } from '@mui/material';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getAvatarChar, getFileUrl } from '@/utils/globalFuntions';
import { useGetCompany, useUpdateCompany } from '@/hooks/company';
import { useQueryClient } from '@tanstack/react-query';

const validationSchema = yup.object({
  account_name: yup
    .string('Enter Email')
    .max(100, 'Email must be maximun 100 characters long.')
    .required('Email is required')
});

const CompanyModal = (props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const callback = (company) => {
    props.handleClose();
    queryClient.setQueryData(['company'], (oldData) => ({
      ...oldData,
      ...company
    }));
  };
  const { isLoading: loading, mutate: updateCompany } =
    useUpdateCompany(callback);
  const formik = useFormik({
    initialValues: {
      account_name: 'Test Company',
      account_logo: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formValues = { ...values };
      if (typeof values.account_logo !== 'object') {
        delete formValues.account_logo;
      }
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      updateCompany(formData);
    }
  });

  return (
    <RoundedDialog
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        sx: {
          minWidth: 300,
          borderRadius: 2
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem' onSubmit={formik.handleSubmit}>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Company
          </Typography>
          <Typography variant='body1' component={'p'}>
            Update company information.
          </Typography>
        </Stack>
        <ImageSection>
          <StyledAvatar src={getFileUrl(formik.values.account_logo)}>
            {getAvatarChar(formik.values.account_name || 'P')}
          </StyledAvatar>
          <Button
            variant='outlined'
            color={'secondary'}
            sx={{
              ...theme.typography.body1,
              color: 'text.secondary',
              px: 2,
              padding: '12.5px',
              borderRadius: 2
            }}
            component='label'
            htmlFor='file-input'
          >
            Change Profile Pic
          </Button>
          <input
            type='file'
            id='file-input'
            hidden
            accept='image/*'
            onChange={(e) =>
              formik.setFieldValue('account_logo', e.target.files[0])
            }
          />
        </ImageSection>
        <Stack gap={'1rem'} marginBottom='20px'>
          <OutlinedInput
            label={'Full Name'}
            placeholder='John Doe'
            name='account_name'
            value={formik.values.account_name}
            onChange={formik.handleChange}
            error={
              formik.touched.account_name && Boolean(formik.errors.account_name)
            }
            helperText={
              formik.touched.account_name && formik.errors.account_name
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
            color={'secondary'}
            variant='contained'
            padding='10px 0px'
            type='button'
            onClick={() => formik.resetForm()}
            sx={{ flex: 1, backgroundColor: 'rgba(39, 93, 113, 0.1)' }}
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
            loading={loading}
            disabled={!formik.dirty}
          >
            <Typography variant='subHeading2'>Update</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default memo(CompanyModal);

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: '#275D71',
  height: '95px',
  width: '95px',
  ...theme.typography.heading1
}));

const ImageSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-end',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));
