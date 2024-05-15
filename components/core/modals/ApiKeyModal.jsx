import React, { memo } from 'react';
import { Stack, Typography } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useInviteUsers } from '@/hooks/users';
import { useCreateDeveloperKey } from '@/hooks/developerOption';

const validationSchema = yup.object({
  api_name: yup
    .string('Enter API Name')
    .max(100, 'API Name must be maximun 100 characters long.')
    .required('API Name is required')
});

const ApiKeyModal = (props) => {
  const onClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const { mutate: createKey, isLoading } = useCreateDeveloperKey(onClose);

  const formik = useFormik({
    initialValues: {
      api_name: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      createKey(values);
    }
  });

  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      maxWidth={'sm'}
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <Stack
        component={'form'}
        gap='1.5rem'
        onSubmit={formik.handleSubmit}
        py={'3rem'}
      >
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Create API
          </Typography>
          <Typography variant='body1' component={'p'}>
            Create API to access your Prompt Privacy account
          </Typography>
        </Stack>
        <Stack gap={'1rem'} marginBottom='20px'>
          <OutlinedInput
            label={'API Name'}
            placeholder='Google-team/sh'
            name='api_name'
            value={formik.values.api_name}
            onChange={formik.handleChange}
            error={formik.touched.api_name && Boolean(formik.errors.api_name)}
            helperText={formik.touched.api_name && formik.errors.api_name}
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
            type={'submit'}
            sx={{ flex: 1 }}
            padding='10px 0px'
            loading={isLoading}
          >
            <Typography variant='body1'>Generate</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default memo(ApiKeyModal);
