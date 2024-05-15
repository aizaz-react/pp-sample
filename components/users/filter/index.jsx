import FilterIcon from '@/assets/CustomIcons/FilterIcon';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import {
  Button,
  Fade,
  FormControlLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/system';
import { useState } from 'react';
const list = [
  { title: 'Active', value: 1 },
  { title: 'Deactivate', value: 2 },
  { title: 'Pending', value: 3 }
];
function UserFilter({ status, setStatus }) {
  const [anchorEl, setAnchorEl] = useState(false);
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const [value, setValue] = useState(status);
  const handleClose = () => setAnchorEl(null);
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
        onClick={(e) => setAnchorEl(e.currentTarget)}
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
          horizontal: 'left'
        }}
        PaperProps={{
          sx: {
            marginTop: '5px',
            backgroundColor: theme.palette.secondaryLight.main,
            border: `1px solid ${theme.palette.divider}40`,
            width: '144px',
            [theme.breakpoints.down('sm')]: {
              width: '100%'
            }
          }
        }}
      >
        <Typography
          variant='body2'
          // color='secondary'
          sx={{
            padding: '13px',
            display: 'block',
            borderBottom: '1px solid #9B9B9B'
          }}
        >
          Filter
        </Typography>
        <Stack padding='0.5rem'>
          <Typography variant='caption1'> Status </Typography>
          <Stack direction={'column'} gap={'0rem'}>
            <RadioGroup
              name='status'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              {list.map(({ title, value }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={
                    <Radio
                      disableRipple
                      size='small'
                      sx={{
                        '&.Mui-checked': {
                          color: theme.palette.secondary.main
                        }
                      }}
                    />
                  }
                  label={title}
                />
              ))}
            </RadioGroup>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
              gap={'4px'}
            >
              <IconButton
                color='secondary'
                onClick={() => {
                  setStatus(null);
                  setValue(null);
                  handleClose();
                }}
              >
                <FilterAltOffOutlinedIcon />
              </IconButton>
              <Button
                variant='contained'
                fullWidth
                sx={{ padding: '4px' }}
                onClick={() => {
                  setStatus(value);
                  handleClose();
                }}
              >
                <Typography variant='body1'>Apply</Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}

const FilterButton = styled(MuiButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'transparent'
  },
  textTransform: 'capitalize',
  border: `1px solid ${theme.palette.divider}40`,
  minWidth: '9rem',
  borderRadius: '8px',
  display: 'flex',
  gap: { sm: '3.2rem', xs: '1rem' },
  paddingInline: '10px 12px',
  color: `${theme.palette.secondary.main}80`,
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    minWidth: '7.5rem'
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '9rem'
  }
}));

export default UserFilter;
