import SearchIcon from '@/assets/CustomIcons/SearchIcon';
import { Stack } from '@mui/material';
import useTheme from '@mui/system/useTheme';
import OutlinedInput from './OutlinedInput';
function SearchInput({ onChange, inputStyle, value }) {
  const theme = useTheme();
  return (
    <OutlinedInput
      endAdornment={
        <Stack mt='-1px' sx={{ pointerEvents: 'none' }}>
          <SearchIcon />
        </Stack>
      }
      value={value}
      onChange={onChange}
      inputStyle={{
        minWidth: 100,
        position: 'relative',
        padding: '.38rem .7rem',
        borderRadius: '8px',
        '&.MuiInputBase-root': {
          border: `1px solid ${theme.palette.divider}20`,
          background: `${theme.palette.background.paper}20`
        },
        '& ::placeholder': {
          color: theme.palette.background.paper
        },
        '&::before': {
          content: `${!!value ? "''" : "'Search'"}`,
          position: 'absolute',
          color: theme.palette.background.paper,
          top: '50%',
          transform: 'translateY(-50%)',
          left: '13px',
          ...theme.typography.body2
        },
        '& input': {
          padding: '0',
          ...theme.typography.body2
        },
        ...inputStyle
      }}
    />
  );
}

export default SearchInput;
