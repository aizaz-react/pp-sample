import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { useForgetPassword } from '@/hooks/auth';
import { useGetProfile, useUpdateProfile } from '@/hooks/profile';
import { getAvatarChar, getFileUrl } from '@/utils/globalFuntions';
import {
  Avatar,
  Box,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RoundedDialog } from '../../styled/core';
import { toast } from 'react-toastify';
import { useState } from 'react';

const validationSchema = yup.object({
  full_name: yup
    .string('Enter Email')
    .max(100, 'Email must be maximun 100 characters long.')
    .required('Email is required')
});

const ProfileModal = (props) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const onClose = () => {
    formik.resetForm();
    props.handleClose();
  };

  const formik = useFormik({
    initialValues: {
      full_name: "test user" || '',
      profile_picture: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        toast.success("Updated successfully")
      }, 3000)
    }
  });

  const handleResetPassword = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Please check your email")
    }, 3000)
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
      <Stack component={'form'} gap='1.5rem' onSubmit={formik.handleSubmit}>
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Profile
          </Typography>
          <Typography variant='body1' component={'p'}>
            Update your prompt privacy profile
          </Typography>
        </Stack>
        <ImageSection>
          <StyledAvatar src={getFileUrl(formik.values.profile_picture)}>
            {getAvatarChar(formik.values.full_name || 'P')}
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
              formik.setFieldValue('profile_picture', e.target.files[0])
            }
          />
        </ImageSection>
        <Stack gap={'1rem'} marginBottom='20px'>
          <OutlinedInput
            label={'Full Name'}
            placeholder='John Doe'
            name='full_name'
            value={formik.values.full_name}
            onChange={formik.handleChange}
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            helperText={formik.touched.full_name && formik.errors.full_name}
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
            type={'submit'}
            sx={{ flex: 1, fontSize: '16px' }}
            padding='10px 0px'
            loading={loading}
            disabled={!formik.dirty}
          >
            <Typography variant='body1' sx={{ color: 'white' }}>
              Update
            </Typography>
          </Button>
        </Stack>
        <Button
          sx={{ borderRadius: '25px' }}
          padding='14px 0px'
          variant='outlined'
          color='secondary'
          type={'button'}
          loading={isLoading}
          onClick={handleResetPassword}
        >
          <Typography variant='body1' component={'p'} sx={{ color: 'white' }}>
            Request Reset Password
          </Typography>
        </Button>
      </Stack>
    </RoundedDialog>
  );
};

export default ProfileModal;

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: '#275D71',
  height: '95px',
  width: '95px',
  border: '3px solid #fff',
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
