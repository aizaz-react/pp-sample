import Button from '@/components/core/Button';
import OutlinedInput from '@/components/core/OutlinedInput';
import { extractDomainFromEmail } from '@/utils/globalFuntions';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RoundedDialog } from '../../styled/core';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  target_email: yup
    .string('Enter Email')
    .max(100, 'Email must be maximum 100 characters long.')
});

const UserModal = (props) => {
  const theme = useTheme();

  const DomainName = extractDomainFromEmail("test@gmail.com");

  const onClose = () => {
    props.handleClose();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      target_email: '',
      target_emails: []
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
     toast.success('Invitation sent successfully.')
    }
  });

  const handleAddEmails = (e) => {
    const { key } = e;
    const { target_emails, target_email } = formik.values;

    if (key !== 'Enter') return;
    if (!target_email) return;

    const newList = [...target_emails, `${target_email}${DomainName}`];
    formik.setFieldValue('target_emails', [...newList]);
    formik.setFieldValue('target_email', '');
  };

  const removeEmail = (value) => {
    const filterList = formik.values.target_emails.filter(
      (email) => email !== value
    );
    formik.setFieldValue('target_emails', filterList);
  };

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'target_email') {
      if (value.includes('@')) {
        const parts = value.split('@');
        const newValue = parts[0];
        formik.setFieldValue('target_email', newValue);
      } else if (value.includes(' ')) {
        value.replace(' ', '');
      } else {
        formik.handleChange(e);
      }
    }
  };

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
        onSubmit={(e) => e.preventDefault()}
      >
        <Stack spacing='10px' marginBottom='10px'>
          <Typography variant='heading1' component={'h1'}>
            Invite User
          </Typography>
          <Typography variant='body1' component={'p'}>
            Target user must belong to the company
          </Typography>
        </Stack>
        <Stack
          gap={'1rem'}
          marginBottom={
            formik.touched.target_email && formik.errors.target_email
              ? '5px'
              : '20px'
          }
        >
          <OutlinedInput
            label={'Email'}
            placeholder='customer1'
            name='target_email'
            value={formik.values.target_email}
            onChange={handleEmailInputChange}
            error={
              formik.touched.target_email && Boolean(formik.errors.target_email)
            }
            helperText={
              formik.touched.target_email && formik.errors.target_email
            }
            endAdornment={
              <Stack
                direction={'row'}
                display={'flex'}
                gap={'1rem'}
                alignItems={'center'}
              >
                <LineSeparator />
                <DomainBox>
                  <Typography variant='body1' whiteSpace={'nowrap'}>
                    {DomainName}
                  </Typography>
                </DomainBox>
                <Button
                  varient='text'
                  color={'primary'}
                  type='button'
                  onClick={() => handleAddEmails({ key: 'Enter' })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                >
                  Add
                </Button>
              </Stack>
            }
            onKeyUp={handleAddEmails}
            inputStyle={{
              border: '1px solid #275D71',
              color: 'secondary',
              borderColor: 'secondary'
            }}
          />
        </Stack>
        <Stack
          maxHeight={'200px'}
          overflow={'auto'}
          direction={'row'}
          flexWrap={'wrap'}
          gap={'1rem'}
        >
          {formik?.values?.target_emails?.map((text, index) => (
            <Button
              key={index}
              color={'secondary'}
              disableRipple
              type='button'
              sx={{
                background: `${theme.palette.background.paper}20`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'text.primary',
                cursor: 'default'
              }}
            >
              <Typography variant='body1' textTransform={'lowercase'}>
                {text}
              </Typography>
              <CloseIcon
                fontSize='small'
                sx={{ cursor: 'pointer' }}
                onClick={() => removeEmail(text)}
              />
            </Button>
          ))}
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
            <Typography
              variant='body1'
              sx={{ color: 'white', fontSize: '16px' }}
            >
              Cancel
            </Typography>
          </Button>
          <Button
            variant='contained'
            type='button'
            sx={{ flex: 1 }}
            padding='10px 0px'
            loading={false}
            onClick={() => formik.handleSubmit()}
          >
            <Typography variant='body1'>Send</Typography>
          </Button>
        </Stack>
      </Stack>
    </RoundedDialog>
  );
};

export default UserModal;

const DomainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '30px',
  backgroundColor: 'transparent',
  alignItems: 'center',
  padding: '10px',
  marginBottom: '2px'
}));

const LineSeparator = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '25px',
  backgroundColor: theme.palette.divider
}));
