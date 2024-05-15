import { memo } from 'react';
import { Box, Stack, Typography, styled, useTheme } from '@mui/material';
import CheckBox from '../core/CheckBox';

const OptionCard = ({ title, check, description, onChange, value }) => {
  const theme = useTheme();
  return (
    <Main checked={check} onClick={() => onChange(value)}>
      <Stack direction='row' alignItems='center' gap={'1rem'} px={'1rem'} py={'0.3rem'}>
        <Box>
          <CheckBox borderColor={theme.palette.primary.main} check={check} />
        </Box>
        <Stack direction='column' gap={1} py={1.5}>
          <Typography variant='subHeading1' component={'h1'}>
            {title}
          </Typography>
          <Typography variant='body2' component={'h1'}>
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Main>
  );
};

export default memo(OptionCard);

const Main = styled(Box)(({ theme, checked }) => ({
  borderRadius: '20px',
  border: `1px solid ${
    checked ? theme.palette.secondary.main : theme.palette.divider
  }`,
  cursor: 'pointer',
  userSelect: 'none'
}));
