import { Box, useTheme } from '@mui/material';

const Separator = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider + 20}`
      }}
    ></Box>
  );
};

export default Separator;
