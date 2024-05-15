import React from 'react';
import { Box, styled, Avatar } from '@mui/material';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEditFolderVault } from '@/hooks/vectorVaultFolder';

const validationSchema = yup.object({
  name: yup
    .string('Enter New Name')
    .max(100, 'Name can be a maximun 100 characters long.')
    .required('Email is required')
});

const RenameModalVectorVault = (props) => {
  //EDIT FOLDER VAULT
  const {
    mutate: triggerEditFolderVault,
    isLoading: triggerEditFolderVaultIsLoading
  } = useEditFolderVault(props.handleClose);
  const theme = useTheme();

  const onClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: props.selected?.name || ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      triggerEditFolderVault({
        vault_id: props.selected?.id,
        name: values.name
      });
    }
  });

  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      maxWidth={'sm'}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: '480px',
          maxHeight: '386px',
          padding: '50px 30px'
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem' onSubmit={formik.handleSubmit}>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Rename
          </Typography>
          <Typography variant='body1' component={'p'}>
            Rename the folder and its contents.
          </Typography>
        </Stack>

        <Stack
          gap={'1rem'}
          marginBottom={
            formik.touched.name && formik.errors.name ? '5px' : '20px'
          }
        >
          <OutlinedInput
            label={'Folder Name'}
            placeholder='RoadmapTodo.pdf'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            loading={triggerEditFolderVaultIsLoading}
          >
            <Typography variant='subHeading2'>Confirm</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default RenameModalVectorVault;
