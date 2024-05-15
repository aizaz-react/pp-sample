import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';

const Card = (props) => {
  const theme = useTheme();
  const { title, description, logo } = props;

  return (
    <Stack
      gap={'1.5rem'}
      sx={{
        padding: '1rem',
        border: '1px solid #bfbfbf30',
        borderRadius: '1rem',
        // background:
        //   'linear-gradient(0deg, #04121830, #04121830), linear-gradient(144.11deg, #0E283310 12.37%, rgba(45, 45, 45, 0.3) 30.36%)'
        background:
          !props?.is_active || !props.category__is_active
            ? theme.palette.text.secondaryLight + '10'
            : 'transparent'
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={'1rem'}
          overflow='hidden'
        >
          <Avatar
            alt={title}
            src={'data:image/png;base64, ' + logo}
            sx={{ width: 40, height: 40 }}
          />
          <Typography title={title} variant='subHeading3' noWrap>
            {title}
          </Typography>
        </Stack>
        {props.status}
      </Stack>
      <Stack gap={'0.5rem'} flex={1}>
        <Typography variant='body1' color='secondary.main'>
          Description
        </Typography>
        <Description variant={'caption1'}>{description}</Description>
      </Stack>
      {props.children}
    </Stack>
  );
};

export default Card;

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const Description = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  color: theme.palette.divider
}));
