import {
  FormHelperText,
  InputBase,
  Stack,
  styled,
  Typography
} from '@mui/material';

const OutlinedInput = (props) => {
  return (
    <Stack width='100%' spacing={1} sx={{ ...props?.sx }}>
      {props.label && (
        <Typography variant='body1' component={props.labelComponent || 'label'}>
          {props.label}{' '}
          {props.required && (
            <Typography component={'span'} color={'primary.main'}>
              *
            </Typography>
          )}
        </Typography>
      )}
      <Input
        className={props.className || ''}
        autoFocus={props.autoFocus}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        endAdornment={props.endAdornment}
        startAdornment={props.startAdornment}
        disabled={props.disabled}
        inputProps={{ maxLength: props.maxLength || 250 }}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        sx={{ ...props.inputStyle }}
        maxRows={props.maxRows}
        minRows={props.minRows}
        multiline={props.multiline}
      />
      {props.helperText && <HelperText helperText={props.helperText} />}
    </Stack>
  );
};
export default OutlinedInput;

export const HelperText = ({ helperText, isAbsolute }) => (
  <FormHelperText
    sx={{
      margin: isAbsolute ? 0 : 'unset'
    }}
  >
    <Typography
      position={isAbsolute ? 'absolute' : 'unset'}
      color='error'
      component={'span'}
      sx={{ fontSize: '.7rem' }}
    >
      {helperText}
    </Typography>
  </FormHelperText>
);

const Input = styled(InputBase)(({ theme }) => ({
  padding: '1px',
  borderRadius: '4px',
  '&.MuiInputBase-root': {
    border: `1px solid ${theme.palette.divider}`
  },
  '&.MuiInputBase-root:focus-within': {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  '& input': {
    padding: '.6rem 1rem',
    width: '100%',
    ...theme.typography.body2
  },
  '& ::placeholder': {
    color: theme.palette.text.secondary
  }
}));
