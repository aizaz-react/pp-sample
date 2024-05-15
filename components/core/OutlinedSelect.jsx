import {
  FormHelperText,
  InputBase,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled
} from '@mui/material';

const OutlinedStyled = (props) => {
  return (
    <Stack width='100%' spacing={1}>
      {props.label && (
        <Typography variant='body1' component={'label'}>
          {props.label}
        </Typography>
      )}
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={props.value}
        input={<Input />}
        onChange={props.handleChange}
      >
        {props.options.map(({ text, value }, index) => (
          <MenuItem value={value} key={index}>
            {text}
          </MenuItem>
        ))}
      </Select>
      {props.helperText && (
        <FormHelperText>
          <Typography
            color='error'
            component={'span'}
            sx={{ fontSize: '.7rem' }}
          >
            {props.helperText}
          </Typography>
        </FormHelperText>
      )}
    </Stack>
  );
};

export default OutlinedStyled;

const Input = styled(InputBase)(({ theme }) => ({
  padding: '.3rem 1rem',
  borderRadius: '4px',
  '&.MuiInputBase-root': {
    border: `1px solid ${theme.palette.divider}`
  },
  '&.MuiInputBase-root:focus-within': {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  '& input': {
    width: '100%',
    ...theme.typography.body1
  },
  '& ::placeholder': {
    color: theme.palette.text.secondary
  }
}));
