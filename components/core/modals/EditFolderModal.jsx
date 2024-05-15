import React, { useState } from 'react';
import { Box, styled, Avatar } from '@mui/material';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { RoundedDialog } from '../../styled/core';
import { useGetProfile, useUpdateProfile } from '@/hooks/profile';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getAvatarChar, getFileUrl } from '@/utils/globalFuntions';
import { useForgetPassword } from '@/hooks/auth';
import PdfIcon from '@/assets/CustomIcons/PdfIcon';
import CrossIconFileUpload from '@/assets/CustomIcons/CrossIconFileUpload';
import { useDropzone } from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useEditFolderVault } from '@/hooks/vectorVaultFolder';

const validationSchema = yup.object({
  full_name: yup.string().required('Vault Name is required')
  .max(100, 'Must be maximun 100 characters long.'),
  desc: yup.string()
  .max(100, 'Must be maximun 100 characters long.'),
  tag: yup.string()
  .max(100, 'Must be maximun 100 characters long.'),
});

const EditFolderModal = (props) => {
  const onClose = () => {
    formik.resetForm();
    props.handleClose();
  };

  const {
    mutate: triggerEditFolderVault,
    isLoading: triggerEditFolderVaultIsLoading
  } = useEditFolderVault(onClose);

  const theme = useTheme();
  // Configure useDropzone
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true, // Allow multiple files
    // accept: {
    // 'text/csv': ['.csv']
    // 'application/pdf': ['.pdf']
    // },
    onDrop: (acceptedFiles) => {
      // Use Formik's setFieldValue to update uploadedFiles
      formik.setFieldValue('uploadedFiles', [
        ...formik.values.uploadedFiles,
        ...acceptedFiles
      ]);
    }
  });

  const formik = useFormik({
    initialValues: {
      full_name: props.selected?.name || '',
      desc: props.selected?.description || '',
      tag: props.selected?.tag || ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      triggerEditFolderVault({
        vault_id: props.selected?.id,
        name: values.full_name,
        description: values.desc,
        tag: values.tag
      });
    }
  });

  return (
    <RoundedDialog open={props.open} onClose={onClose} PaperProps={{}}>
      <Stack component={'form'} gap='1.5rem'>
        <Stack spacing='8px'>
          <Typography variant='heading1'>Edit Vault</Typography>
        </Stack>

        {/* Start */}
        <MainBox className='MainBox' direction={'row'}>
          <Stack
            className='MainBox_Stack'
            direction='column'
            width='100%'
            gap='1rem'
          >
            <OutlinedInput
              required
              name='full_name'
              value={formik.values.full_name}
              onChange={formik.handleChange}
              error={
                formik.touched.full_name && Boolean(formik.errors.full_name)
              }
              helperText={formik.touched.full_name && formik.errors.full_name}
              label={'Vault Name'}
              placeholder='Expensive Reports'
              sx={{ marginBottom: '20px' }}
            />
            <OutlinedInput
              name='desc'
              value={formik.values.desc}
              onChange={formik.handleChange}
              error={formik.touched.desc && Boolean(formik.errors.desc)}
              helperText={formik.touched.desc && formik.errors.desc}
              label={'Description'}
              placeholder='Maintenance data and indexes'
              sx={{ marginBottom: '20px' }}
            />
            <OutlinedInput
              name='tag'
              value={formik.values.tag}
              onChange={formik.handleChange}
              error={formik.touched.tag && Boolean(formik.errors.tag)}
              helperText={formik.touched.tag && formik.errors.tag}
              label={'Tag'}
              placeholder='Google Store'
              sx={{ marginBottom: '20px' }}
            />
          </Stack>
        </MainBox>

        {/* Buttons  */}
        <ButtonStack
          className='ButtonStack'
          direction='row'
          gap={'20px'}
          marginBottom='5px'
          alignItems='flex-end'
          marginLeft='55%'
        >
          <Button
            className='ButtonOne'
            color={'secondary'}
            variant='contained'
            padding='10px 0px'
            type='button'
            sx={{ flex: 1, backgroundColor: 'rgba(39, 93, 113, 0.1)' }}
            onClick={onClose}
          >
            <Typography variant='body1' sx={{ color: 'white' }}>
              Cancel
            </Typography>
          </Button>
          <Button
            className='ButtonTwo'
            variant='contained'
            type={'submit'}
            sx={{ flex: 1 }}
            padding='10px 0px'
            onClick={formik.handleSubmit}
            loading={triggerEditFolderVaultIsLoading}
            disabled={!formik.dirty}
          >
            <Typography variant='body1'>Confirm</Typography>
          </Button>
        </ButtonStack>
      </Stack>
    </RoundedDialog>
  );
};

export default EditFolderModal;

const UploadBoxComp = (props) => {
  const { fileName } = props;
  return (
    <>
      <UploadBox
        direction='row'
        gap='1rem'
        alignItems='flex-start'
        justifyContent={'flex-start'}
        padding='0rem 1rem 0rem 1rem'
      >
        <Box>
          <PdfIcon />{' '}
        </Box>
        <Stack direction='column' gap='8px'>
          <Typography
            sx={{
              lineHeight: '19px',
              letterSpacing: '0em'
            }}
          >
            {`Uploading (${fileName}).pdf`}
          </Typography>
          <TypographySecconds> 63% · 20 seconds remaining</TypographySecconds>
        </Stack>
        <Box marginLeft={'auto'}>
          <CrossIconFileUpload />
        </Box>
      </UploadBox>
    </>
  );
};

const UploadBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: '100%',
  height: '80px',
  borderRadius: '5px',
  gap: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  direction: 'row'
}));

const UploadChildBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}));

const MainBox = styled(Stack)(({ theme }) => ({
  width: '100%',
  gap: '1rem',
  display: 'flex',
  direction: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const TypographySecconds = styled(Typography)(({ theme }) => ({
  fontFamily: 'Proxima Nova',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '17px',
  letterSpacing: '0em',
  textAlign: 'left',
  color: '#929292'
}));

const FileUploader = styled(Box)(({ theme }) => ({
  background: theme.palette.background.header,
  borderRadius: '10px',
  borderWidth: '3px',
  width: 'auto',
  height: '80px',
  width: '100%',
  border: '1px dashed #A0A4A8',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0px 1rem 0px 1rem'
}));

const UploaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}));

const FileShow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  margin: `${theme.spacing(2)}`
}));

const ButtonStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  gap: '20px',
  marginBottom: '5px',
  alignItems: 'flex-end',
  marginLeft: '55%',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: '0px'
  }
}));
