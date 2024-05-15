import React from 'react';
import { Box, styled, Avatar } from '@mui/material';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEditVaultFile } from '@/hooks/vectorVaultFile';
// useEditVaultFile

const validationSchema = yup.object({
  name: yup.string('Enter New Name').required('File name is required')
  .max(100, 'Must be maximun 100 characters long.'),
});

const EditFileModal = (props) => {
  //EDIT FOLDER VAULT
  const { mutate: triggerEditFile, isLoading: isLoadingEditFile } =
    useEditVaultFile(props.handleClose);
  const theme = useTheme();

  const onClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: props.selected?.name || '',
      desc: props.selected?.description || '',
      tag: props.selected?.tag || '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      triggerEditFile({
        vault_id: props.vaultId,
        file_id: props.selected?.id,
        file_name: values.name,
        description: values.desc,
        tag: values.tag,
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
          padding: '50px 30px',
          overflow:'auto'
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem'>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Edit
          </Typography>
          <Typography variant='body1' component={'p'}>
            Edit {formik.values.name} file
          </Typography>
        </Stack>

        <Stack
          gap={'1rem'}
          marginBottom={
            formik.touched.name && formik.errors.name ? '5px' : '20px'
          }
        >
          <OutlinedInput
            required
            label={'File Name'}
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
          <OutlinedInput
            required
            label={'Description'}
            name='desc'
            value={formik.values.desc}
            onChange={formik.handleChange}
            error={formik.touched.desc && Boolean(formik.errors.desc)}
            helperText={formik.touched.desc && formik.errors.desc}
            inputStyle={{
              border: '1px solid #275D71',
              color: 'secondary',
              borderColor: 'secondary'
            }}
          />
          <OutlinedInput
            required
            label={'Tag'}
            name='tag'
            value={formik.values.tag}
            onChange={formik.handleChange}
            error={formik.touched.tag && Boolean(formik.errors.tag)}
            helperText={formik.touched.tag && formik.errors.tag}
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
            <Typography variant='body1' sx={{ color: 'white' }}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            sx={{ flex: 1 }}
            padding='10px 0px'
            loading={isLoadingEditFile}
            onClick={formik.handleSubmit}
          >
            <Typography variant='body1'>Confirm</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default EditFileModal;
