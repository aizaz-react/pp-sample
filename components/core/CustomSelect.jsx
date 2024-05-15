import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Avatar,
  CircularProgress,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { memo } from 'react';

const CustomSelect = (props) => {
  const theme = useTheme();
  const {
    value,
    onChange,
    list = [],
    width,
    renderValue,
    isLoading,
    sx,
    bgColor,
    minWidth,
    disabled
  } = props;
  return (
    <FormControl sx={{ width: width ?? 150 }} size='small'>
      <Select
        disabled={disabled}
        sx={{ ...sx }}
        name={props.name}
        color={props.color || 'secondary'}
        value={value}
        onChange={onChange}
        input={<SelectInput />}
        inputProps={{ 'aria-label': 'Without label' }}
        MenuProps={{
          style: {
            maxHeight: props.maxHeight
          },
          sx: {
            '& .MuiPaper-root': {
              backgroundColor: 'secondaryLight.main'
            }
          }
        }}
        multiple={props.multiple}
        renderValue={(value) => {
          let item = list?.find((item) => item.value === value);
          if (props.multiple) {
            item = list
              ?.flatMap((item) =>
                value.includes(item.value) ? [item.name] : []
              )
              .join(', ');
          }
          return renderValue ? (
            <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'}>
              {!!item && list.length > 0 && (
                <Avatar
                  alt={value}
                  src={'data:image/png;base64, ' + item?.logo}
                  sx={{ width: 22, height: 22 }}
                />
              )}
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {item?.name}
              </Typography>
            </Stack>
          ) : (
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {props.multiple ? item : item?.name}
            </Typography>
          );
        }}
        IconComponent={(props) =>
          isLoading ? (
            <Stack marginRight={'0.5rem'}>
              <CircularProgress size={15} />
            </Stack>
          ) : (
            <ExpandMoreIcon className={`${props.className}`} />
          )
        }
      >
        {list.map(({ name, value, disabled, logo }, i) => (
          <MenuItem
            key={i}
            value={value}
            disabled={disabled}
            minWidth={minWidth || ''}
          >
            <Stack direction={'row'} alignItems={'center'} gap={'0.5rem'}>
              {renderValue && (
                <Avatar
                  alt={value}
                  src={'data:image/png;base64, ' + logo}
                  sx={{ width: 22, height: 22 }}
                />
              )}
              <Typography
                component='span'
                sx={{
                  maxWidth: '135px',
                  overflow: 'hidden',
                  [theme.breakpoints.down('lg')]: {
                    maxWidth: 130
                  },
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 90
                  }
                }}
                noWrap
              >
                {name}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SelectInput = styled(OutlinedInput)(({ theme, border }) => ({
  padding: '.15rem 0rem',

  '&': {
    'div[aria-expanded="false"]': {},
    'div[aria-expanded="false"] ~ fieldset': {
      borderColor: `${theme.palette.secondary.main}80 !important`,
      borderWidth: '1px !important'
    }
  },
  '& fieldset': {
    borderColor: border || theme.palette.secondary.main + '80'
  }
}));
const Label = styled(MenuItem)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    '& span': {
      maxWidth: '500px'
    }
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 'unset',
    '& span': {
      maxWidth: '240px'
    }
  }
}));
export default memo(CustomSelect);
