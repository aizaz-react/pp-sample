import Button from '@/components/core/Button';
import CustomSelect from '@/components/core/CustomSelect';
import { useSendStudioMessage } from '@/hooks/chat';
import { useGetCompany } from '@/hooks/company';
import {
  Box,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import * as yup from 'yup';
import { RoundedDialog } from '../../styled/core';

const validationSchema = yup.object({
  model: yup.string().required('Please select model for chat.')
});

const TextPromptModal = (props) => {
  const { selected, previousId } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const { mutate: send, isLoading } = useSendStudioMessage({
    id: previousId,
    title: JSON.stringify({ title: selected?.title, id: selected?.id }),
    callback: () => previousId && router.back()
  });

  const { data } = useGetCompany();

  const formik = useFormik({
    initialValues: {
      model: selected?.products?.length ? selected?.products[0]?.slug : '',
      tenant_id: data?.company_id || '',
      prompts: selected?.descriptive_fields?.prompt
        ? selected?.descriptive_fields?.prompt
        : selected?.descriptive_fields?.prompts
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      send(values);
    }
  });

  const handleChange = useCallback(
    (type) => (event) => {
      const {
        target: { value }
      } = event;
      formik.setFieldValue('model', value);
    },
    [formik]
  );

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
          <Typography
            variant='heading3'
            component={'h1'}
            sx={{ wordBreak: 'break-word' }}
          >
            {selected?.title}
          </Typography>
          <Typography variant='body1' component={'p'} width={'85%'}>
            {selected?.description}
          </Typography>
        </Stack>
        <Stack flex={1} gap='10px'>
          <Typography variant='body1'>Model</Typography>
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
            onChange={handleChange('model')}
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
            loadingSize={23}
          >
            <Typography variant='body1'>Confirm</Typography>
          </Button>
        </Toolbar>
      </Stack>
    </RoundedDialog>
  );
};

export default TextPromptModal;

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
