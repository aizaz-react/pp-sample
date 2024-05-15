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
import { useAddFolderVault } from '@/hooks/vectorVaultFolder';

const validationSchema = yup.object({
  full_name: yup
    .string()
    .required('Vault Name is required')
    .max(100, 'Must be maximun 100 characters long.'),
  desc: yup.string().max(100, 'Must be maximun 100 characters long.'),
  tag: yup.string().max(100, 'Must be maximun 100 characters long.'),
  uploadedFiles: yup.array().min(1, 'Atleast one file is required')
});

const CreateFolderModal = (props) => {
  const theme = useTheme();

  const onClose = () => {
    formik.resetForm();
    props.handleClose();
  };

  const {
    mutate: triggerAddFolderVault,
    isLoading: triggerAddFolderVaultIsLoading
  } = useAddFolderVault(onClose);

  // Configure useDropzone
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true, // Allow multiple files
    onDrop: (acceptedFiles) => {
      formik.setFieldValue('uploadedFiles', [
        ...formik.values.uploadedFiles,
        ...acceptedFiles
      ]);
    }
  });

  const formik = useFormik({
    initialValues: {
      full_name: '',
      desc: '',
      tag: '',
      uploadedFiles: [] // New field for holding filessub
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const finalData = new FormData();
      finalData.append('name', values.full_name);
      finalData.append('description', values.desc);
      finalData.append('tag', values.tag);
      values.uploadedFiles.map((file) => {
        finalData.append('files', file);
      });
      triggerAddFolderVault(finalData);
    }
  });

  const removeItem = (index) => {
    const files = [...formik.values.uploadedFiles];
    files.splice(index, 1);
    formik.setFieldValue('uploadedFiles', [...files]);
  };

  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: '50px 40px',
          maxWidth: '600px',
          width: '70%',
          overflow: 'auto'
        }
      }}
    >
      <Stack component={'form'} gap='1.5rem'>
        <Stack spacing='8px' className='StackOne'>
          <Typography variant='heading1'>Create Vault</Typography>
          <Typography variant='body1' component={'p'}>
            Create a vault and upload files in it
          </Typography>
        </Stack>

        {/* Start */}
        <MainBox className='MainBox_StackTwo' direction={'column'}>
          <Stack direction='column' width='100%'>
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
              sx={{ marginBottom: '20px' }}
            />
            <OutlinedInput
              name='desc'
              value={formik.values.desc}
              onChange={formik.handleChange}
              error={formik.touched.desc && Boolean(formik.errors.desc)}
              helperText={formik.touched.desc && formik.errors.desc}
              label={'Description'}
              sx={{ marginBottom: '20px' }}
            />
            <OutlinedInput
              name='tag'
              value={formik.values.tag}
              onChange={formik.handleChange}
              error={formik.touched.tag && Boolean(formik.errors.tag)}
              helperText={formik.touched.tag && formik.errors.tag}
              label={'Tag'}
              sx={{ marginBottom: '20px' }}
            />
          </Stack>

          {/* Uploading Files  */}
          <Stack
            className='UploadingFiles'
            direction='column'
            width='100%'
            alignItems='flex-start'
            gap='16px'
            sx={{
              maxHeight: '300px',
              [theme.breakpoints.down('md')]: {
                // paddingTop: '23px'
              }
            }}
          >
            {/* <FileUpload> */}
            <FileUploader
              className='FileUploader'
              {...getRootProps()}
              component={'label'}
              sx={{ borderWidth: '3px' }}
            >
              <UploaderContent>
                <Typography
                  variant='display3'
                  component={'p'}
                  color='text.primary'
                >
                  Drop your file(s) here or Browse
                </Typography>
              </UploaderContent>
            </FileUploader>
            {formik.touched.uploadedFiles && formik.errors.uploadedFiles && (
              <Typography variant={'caption1'} color={'error'}>
                {formik.errors.uploadedFiles}
              </Typography>
            )}

            {/* Map Files  */}
            <Stack
              className='MappedFiles-Stack'
              sx={{
                maxHeight: '121px',
                overflow: 'auto',
                width: '100%'
              }}
              gap={'1rem'}
            >
              {formik.values.uploadedFiles &&
                formik.values.uploadedFiles.map((file, index) => (
                  <UploadBoxComp
                    key={index}
                    fileName={file?.name}
                    index={index}
                    removeItem={removeItem}
                  />
                ))}
            </Stack>
          </Stack>
        </MainBox>
        {/* End */}

        {/* Buttons  */}
        <ButtonStack
          className='Button_Stack'
          direction='row'
          gap={'20px'}
          marginBottom='5px'
          alignItems='flex-end'
          marginLeft='55%'
        >
          <Button
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
            variant='contained'
            type={'submit'}
            sx={{ flex: 1 }}
            padding='10px 0px'
            onClick={formik.handleSubmit}
            loading={triggerAddFolderVaultIsLoading}
            disabled={!formik.dirty}
            loadingSize={23}
          >
            <Typography variant='body1'>Confirm</Typography>
          </Button>
        </ButtonStack>
      </Stack>
    </RoundedDialog>
  );
};

export default CreateFolderModal;

const UploadBoxComp = (props) => {
  const { fileName, index } = props;
  return (
    <>
      <UploadBox
        direction='row'
        gap='1rem'
        alignItems='flex-start'
        justifyContent={'flex-start'}
        padding='0.5rem '
        sx={{ backgroundColor: '#0E2833' }}
      >
        <Stack direction='column' gap='8px'>
          <Typography
            sx={{
              lineHeight: '19px',
              letterSpacing: '0em'
            }}
          >
            {fileName}
          </Typography>
        </Stack>
        <Stack
          marginLeft={'auto'}
          onClick={() => props.removeItem(index)}
          sx={{ cursor: 'pointer' }}
          justifyContent={'center'}
        >
          <CrossIconFileUpload />
        </Stack>
      </UploadBox>
    </>
  );
};

const UploadBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: '100%',
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
  border: '1px dashed #A0A4A8',
  borderWidth: '1px',
  width: 'auto',
  height: '80px',
  width: '100%',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0px 1rem 0px 1rem',
  marginTop: '5px'
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
