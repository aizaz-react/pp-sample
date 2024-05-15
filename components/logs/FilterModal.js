'use client';
import FilterIcon from '@/assets/CustomIcons/FilterIcon';
import {
  LOGS_ACTION_TYPE,
  LOGS_LEVEL,
  LOG_TYPE_CHOICES
} from '@/utils/constants';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import {
  Box,
  IconButton,
  InputBase,
  Popover,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import MuiButton from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import { useFormik } from 'formik';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../core/Button';
import CustomSelect from '../core/CustomSelect';
import Calendar from './Calendar';

const level = Object.entries(LOGS_LEVEL).map(([value, name]) => ({
  value,
  name
}));

const type = Object.entries(LOG_TYPE_CHOICES).map(([value, name]) => ({
  value,
  name
}));

const action = Object.entries(LOGS_ACTION_TYPE).map(([value, name]) => ({
  value,
  name
}));

const CustomInput = ({ value, defaultValue, inputRef, ...props }) => {
  return <input {...props} defaultValue={defaultValue} ref={inputRef} />;
};
const today = new Date();
const FilterModal = (props) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconButtonClick = () => {
    props.handleFilter({
      level: '',
      type: '',
      action: '',
      start_date: '',
      end_date: ''
    });
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      level: props?.level,
      type: props?.type,
      action: props?.action,
      start_date: props?.start_date,
      end_date: props?.end_date
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.end_date < values.start_date) {
        toast.error('Start date should be less than end date');
        return;
      }
      props.handleFilter({ ...values });
      formik.resetForm();
      handleClose();
    }
  });

  const handleChangeChoice = useCallback(
    (type) => (event) => {
      const {
        target: { value }
      } = event;
      formik.setFieldValue(type, value);
    },
    [formik]
  );
  const handleDateChange = useCallback(
    (dates, field) => {
      const ts = moment(dates[0]).unix();
      formik.setFieldValue(field, ts);
    },
    [formik]
  );
  return (
    <>
      <FilterButton
        variant='text'
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        disableRipple
        onClick={handleClick}
      >
        <Typography variant='body2'>Filter</Typography>
        <FilterIcon />
      </FilterButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}40`,
            maxWidth: '320px',
            width: 'calc(100% - 32px)'
          }
        }}
      >
        <Box component={'form'} onSubmit={formik.handleSubmit}>
          <Stack direction={'column'}>
            <Box
              sx={{
                width: '100%',
                borderBottom: `1px solid ${theme.palette.divider}40`,
                padding: '1rem 1rem'
              }}
            >
              <Typography variant='body1'> Filter </Typography>
            </Box>
            <Stack direction={'column'} padding={'1rem 1rem'} gap={'0.5rem'}>
              <Stack gap='.2rem'>
                <Typography variant='body1'> Level </Typography>
                <CustomSelect
                  list={[{ name: 'Select', value: '' }, ...level]}
                  value={formik.values.level}
                  onChange={handleChangeChoice('level')}
                  width={'100%'}
                />
              </Stack>
              <Stack gap='.2rem'>
                <Typography variant='body1'> Type </Typography>
                <CustomSelect
                  list={[{ name: 'Select', value: '' }, ...type]}
                  value={formik.values.type}
                  onChange={handleChangeChoice('type')}
                  width={'100%'}
                />
              </Stack>

              <Stack gap='.2rem'>
                <Typography variant='body1'> Action </Typography>
                <CustomSelect
                  list={[{ name: 'Select', value: '' }, ...action]}
                  value={formik.values.action}
                  onChange={handleChangeChoice('action')}
                  width={'100%'}
                />
              </Stack>
              <Calendar
                title='Start Date'
                handleDateChange={handleDateChange}
                value={formik.values.start_date}
                field='start_date'
              />
              <Calendar
                title='End Date'
                handleDateChange={handleDateChange}
                value={formik.values.end_date}
                field='end_date'
              />

              <Stack direction={'column'} gap={'0rem'}>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  width={'100%'}
                  gap={'1rem'}
                >
                  <IconButton color='secondary' onClick={handleIconButtonClick}>
                    <FilterAltOffOutlinedIcon />
                  </IconButton>
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{ padding: '0.4rem 1.2rem' }}
                    onClick={formik.handleSubmit}
                  >
                    <Typography variant='body1'>Apply</Typography>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default FilterModal;

const FilterButton = styled(MuiButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent'
  },
  textTransform: 'capitalize',
  border: `1px solid ${theme.palette.divider}40`,
  minWidth: '9rem',
  borderRadius: '10px',
  display: 'flex',
  gap: { sm: '3.2rem', xs: '1rem' },
  paddingLeft: { xs: '1rem' },
  color: `${theme.palette.secondary.main}80`,
  justifyContent: 'space-between'
}));

const Input = styled(InputBase)(({ theme }) => ({
  padding: '1px',
  borderRadius: '4px',
  '&.MuiInputBase-root': {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  '&.MuiInputBase-root:focus-within': {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  '& input': {
    padding: '.4rem .7rem',
    width: '100%',
    ...theme.typography.body1
  },
  '& ::placeholder': {
    color: theme.palette.text.secondary
  }
}));
