import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { useAddCategory, useUpdateCategory } from '@/hooks/promptstudio';
import { handleKeyPress } from '@/utils/globalFuntions';
import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as yup from 'yup';
import { RoundedDialog } from '../../styled/core';

const validationSchema = yup.object({
  title: yup
    .string('Enter Title')
    .max(100, 'Title must be maximum 100 characters long.')
    .required('Title is required')
});

const statuses = [
  { name: 'Active', value: true },
  { name: 'Deactive', value: false }
];

const CategoryModal = (props) => {
  const { selected } = props;
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      title: selected?.title || ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!selected)
        return addCategory({ title: values?.title, cost: values?.cost });
      updateCategory({ ...values, category_id: selected?.id });
    }
  });

  const handleCancelButtonClick = () => {
    formik.resetForm();
    props.handleClose();
  };

  const { mutate: addCategory, isLoading } = useAddCategory(
    handleCancelButtonClick
  );

  const { mutate: updateCategory, isLoading: loading } = useUpdateCategory(
    handleCancelButtonClick
  );

  const handleChangeStatus = useCallback(
    (type) => (event) => {
      const {
        target: { value }
      } = event;
      formik.setFieldValue(type, value);
    },
    [formik]
  );

  return (
    <RoundedDialog
      open={props.open}
      onClose={handleCancelButtonClick}
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
            {selected ? 'Edit' : 'Add'} Category
          </Typography>
          <Typography variant='body1' component={'p'}>
            {selected ? 'Edit' : 'Add'} category in Prompt Studio
          </Typography>
        </Stack>
        <Stack gap={'1rem'} marginBottom='20px'>
          <OutlinedInput
            label={'Category Name'}
            placeholder='Title'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
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
            sx={{ flex: 1, backgroundColor: 'rgba(39, 93, 113, 0.1)' }}
            onClick={handleCancelButtonClick}
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
            loading={isLoading || loading}
            disabled={!formik.dirty}
          >
            <Typography variant='body1'>Confirm</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default CategoryModal;

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
