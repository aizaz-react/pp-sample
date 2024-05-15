import CrossIcon from '@/assets/CustomIcons/CrossIcon';
import FilePlaceholder from '@/assets/CustomIcons/FilePlaceholder';
import ImagePlaceholder from '@/assets/CustomIcons/ImagePlaceholder';
import Button from '@/components/core/Button';
import CustomSelect from '@/components/core/CustomSelect';
import { CardWrapper } from '@/components/styled/core';
import { useGetCompany } from '@/hooks/company';
import { useExecutePromptStudio } from '@/hooks/promptstudio';
import {
  checkAllFiles,
  imageModel,
  isImageFile,
  megabytesToBytes
} 
from '@/utils/globalFuntions';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import * as yup from 'yup';
import { RoundedDialog } from '../../styled/core';
import { useGetHyperParameters } from '@/hooks/hyperParameter';
import { HyperParametersContext } from '@/components/hoc/HyperParametersContext';

const validationSchema = yup.object({
  files: yup.array().min(1, 'File is required'),
  model: yup.string().required('Please select model for chat.')
});

const ChatStudioModal = (props) => {
  const { selected, previousId } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const callBack = useCallback(
    () => previousId && router.back(),
    [previousId, router]
  );
  const { data: metadata } = useGetHyperParameters({})

  const { mutate: runPrompt, isLoading } = useExecutePromptStudio({
    cb: callBack,
    id: previousId,
    title: JSON.stringify({ title: selected?.title, id: selected?.id })
  });
  const { data } = useGetCompany();

  const formik = useFormik({
    initialValues: {
      files: [],
      model: selected?.products?.length ? selected?.products[0]?.slug : '',
      prompt: selected?.slug || '',
      tenant_id: data?.company_id || ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const size = values.files.reduce((acc, cur) => cur.size + acc, 0);
      if (size > megabytesToBytes(selected?.descriptive_fields?.maxsize)) {
        return setFilesError(
          `Number of selected files size must be ${selected?.descriptive_fields?.maxsize} MB`
        );
      }
      if (selected?.descriptive_fields?.media_limit !== values.files.length) {
        return setFilesError(
          `Number of selected files must be ${selected?.descriptive_fields?.media_limit}`
        );
      }
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'files') {
          value.forEach((file) => {
            formData.append('prompts', file);
          });
          return;
        }
        formData.append(key, value);
      });
      formData.append('hyperparameters',{hyperparameters: {
        ...metadata?.hyper_parameters,
        context_chaining: !imageModel(values.model)
      }})
      runPrompt(formData);
    }
  });

  const setFilesError = useCallback(
    (error) => {
      formik.setFieldError('files', error);
      setTimeout(() => {
        formik.setFieldError('files', ``);
      }, 4000);
      return;
    },
    [formik]
  );
  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = [...formik.values.files, ...acceptedFiles];
      const checkSameExt = checkAllFiles({
        files,
        formats: selected?.descriptive_fields?.formats
      });
      if (!checkSameExt) {
        return setFilesError(
          `Selected files must be same type of ${selected?.descriptive_fields?.formats?.join(
            ', '
          )}`
        );
      }
      formik.setFieldValue('files', files);
    },
    [selected?.descriptive_fields?.formats, formik, setFilesError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFiles = (index) => {
    const files = [...formik.values.files];
    files.splice(index, 1);
    formik.setFieldValue('files', files);
  };

  return (
    <RoundedDialog
      open={props.open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          padding: matches ? '1rem 1rem' : '2rem 2.5rem'
        }
      }}
      PaperProps={{
        sx: {
          minWidth: 280,
          borderRadius: 2
        }
      }}
    >
      <Stack
        component={'form'}
        onSubmit={formik.handleSubmit}
        spacing='10px'
        marginBottom='10px'
        gap={'1rem'}
      >
        <Stack gap='10px'>
          <Typography variant='heading3' component={'h1'}>
            {selected?.title}
          </Typography>
          <Typography variant='body1' component={'p'} width={'85%'}>
            {selected?.description}
          </Typography>
        </Stack>
        <CardWrapper
          sx={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            maxHeight: 300,
            overflow: 'auto'
          }}
        >
          {formik.values.files.map((file, index) => (
            <Stack
              alignItems={'center'}
              gap={'1rem'}
              sx={{
                position: 'relative',
                border: '1px solid #888',
                borderRadius: '8px'
              }}
              key={index}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '0rem',
                  right: '0rem',
                  zIndex: 1
                }}
                onClick={() => removeFiles(index)}
              >
                <CrossIcon color={'#fff'} />
              </IconButton>
              {isImageFile(file.name) ? (
                <Avatar
                  variant='rounded'
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  sx={{ width: '100%', height: '150px' }}
                />
              ) : (
                <Stack
                  alignItems={'center'}
                  gap={'1rem'}
                  sx={{
                    padding: '1rem'
                  }}
                >
                  <FilePlaceholder />
                  <Typography
                    variant={'caption1'}
                    noWrap
                    sx={{ maxWidth: '120px' }}
                    color={'text.secondary'}
                  >
                    {file.name.split('.').shift().toUpperCase()}
                  </Typography>
                  <Typography
                    variant={'caption2'}
                    color={'text.secondaryLight'}
                  >
                    {file.name.split('.').pop().toUpperCase()}
                  </Typography>
                </Stack>
              )}
            </Stack>
          ))}
        </CardWrapper>
        <Stack gap={'0.5rem'}>
          <FilePicker {...getRootProps()}>
            <input {...getInputProps()} />
            <ImagePlaceholder />
            <Stack>
              <Typography sx={{ textAlign: 'center' }} variant={'body2'} mt={1}>
                Upload only{' '}
                <Typography component={'span'} color={'primary'}>
                  {selected?.descriptive_fields?.formats.join(', ')}
                </Typography>{' '}
                files
              </Typography>
              <Typography sx={{ textAlign: 'center' }} variant={'body2'}>
                Required files:{' '}
                <Typography
                  component={'span'}
                  color={'primary'}
                  variant={'body2'}
                >
                  {selected?.descriptive_fields?.media_limit}
                </Typography>
              </Typography>
              {isDragActive ? (
                <Typography sx={{ textAlign: 'center' }} variant={'caption1'}>
                  Drop the files here ...
                </Typography>
              ) : (
                <Typography sx={{ textAlign: 'center' }} variant={'caption1'}>
                  Drop your file(s) here or{' '}
                  <Typography
                    component={'span'}
                    color={'primary'}
                    variant={'caption1'}
                  >
                    browse
                  </Typography>
                </Typography>
              )}
            </Stack>
          </FilePicker>
          {formik.errors.files && (
            <Typography variant={'caption1'} color={'error'}>
              {formik.errors.files}
            </Typography>
          )}
        </Stack>
        <Stack flex={1}>
          <CustomSelect
            list={selected?.products?.map((product) => ({
              name: product.title,
              value: product.slug,
              disabled: false
            }))}
            name={'model'}
            disabled={selected?.products?.length === 1}
            value={
              selected?.products?.length === 1
                ? selected?.products[0].slug
                : formik.values.model
            }
            onChange={formik.handleChange}
            width={'100%'}
          />
          {formik.touched.model && formik.errors.model && (
            <Typography color={'error'} variant='caption1' component={'p'}>
              {formik.touched.model && formik.errors.model}
            </Typography>
          )}
        </Stack>

        <Toolbar direction={'row'} gap={matches ? '0.5rem' : '1rem'}>
          <Button
            sx={{
              borderRadius: '2rem',
              background: `${theme.palette.background.paper}10`
            }}
            fullWidth
            color='secondary'
            variant={'contained'}
            onClick={props.handleClose}
          >
            <Typography variant='body1'>Cancel</Typography>
          </Button>
          <Button
            sx={{
              borderRadius: '2rem'
            }}
            fullWidth
            type={'submit'}
            variant={'contained'}
            loading={isLoading}
            disabled={!formik.dirty}
            loadingSize={23}
          >
            <Typography variant='body1'>Confirm</Typography>
          </Button>
        </Toolbar>
      </Stack>
    </RoundedDialog>
  );
};

export default ChatStudioModal;

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const FilePicker = styled(Box)(({ theme }) => ({
  // backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23A0A4A8FF' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  border: '1px dashed ' + theme.palette.text.secondary + 50,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.2rem',
  borderRadius: '8px',
  gap: '1rem',
  cursor: 'pointer'
}));
