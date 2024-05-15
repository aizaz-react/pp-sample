import { Stack } from '@mui/material';
import styled from '@mui/system/styled';

export const ButtonWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& button': {
      width: '100%'
    }
  }
}));
export default ButtonWrapper;
