import { cardIcons } from '@/components/core/modals/PaymentModal/utils';
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  useMediaQuery
} from '@mui/material';

const PaymentCard = ({ data, setOpen }) => {
  const matches = useMediaQuery('(max-width:900px)');
  const theme = useTheme();

  return (
    <CardWrapper>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={matches ? 'inherit' : ''}
      >
        <Typography
          variant='subHeading2'
          fontSize={'16px'}
          lineHeight={'20px'}
          color={theme.palette.primary.main}
        >
          Payout Info
        </Typography>

        {cardIcons[data?.payment_method?.brand] && (
          <SvgWrapper component='span'>
            {cardIcons[data?.payment_method?.brand]}
          </SvgWrapper>
        )}
      </Stack>
      <Stack>
        <Typography variant='subHeading1'>
          <span style={{ verticalAlign: 'sub', marginRight: '0.3rem' }}>
            **** **** ****
          </span>
          <span>{data?.payment_method?.last4}</span>
        </Typography>
      </Stack>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        marginBottom={'10px'}
      >
        <Stack direction={'column'}>
          <CardTypography
            fontWeight={'400'}
            color={theme.palette.text.secondaryLight}
          >
            Exp date
          </CardTypography>
          <CardTypography sx={{ ...theme.typography.caption1 }}>
            {data?.payment_method?.exp_month?.toString()?.padStart(2, '0')}/
            {data?.payment_method?.exp_year}
          </CardTypography>
        </Stack>
        <Stack
          direction={'column'}
          alignItems={'center'}
          paddingRight={'0.35rem'}
        >
          <CardTypography
            fontWeight={'400'}
            color={theme.palette.text.secondaryLight}
          >
            CVC
          </CardTypography>
          <CardTypography
            sx={{ ...theme.typography.caption1, marginTop: '2px' }}
          >
            ***
          </CardTypography>
        </Stack>
      </Stack>
      <Button
        variant={'contained'}
        sx={{
          position: 'absolute',
          bottom: '0',
          transform: 'translateY(50%)',
          display: 'flex',
          alignSelf: 'center',
          padding: '0.3rem 1.5rem'
        }}
      >
        <Typography
          variant='caption1'
          whiteSpace={'nowrap'}
          onClick={() => setOpen(true)}
        >
          Update Payment
        </Typography>
      </Button>
    </CardWrapper>
  );
};

export default PaymentCard;

const SvgWrapper = styled(Box)(() => ({
  '& svg': {
    width: '50px',
    height: 'auto',
    marginTop: '-9px'
  }
}));

const CardWrapper = styled(Stack)(({ theme }) => ({
  position: 'relative',
  gap: '1rem',
  borderRadius: '1rem',
  border: `1px solid ${theme.palette.primary.main}`,
  maxWidth: '280px',
  width: '100%',
  padding: '1rem 1rem 0.5rem',
  background: `${theme.palette.background.paper}30`,
  userSelect: 'none',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '280px'
  }
}));

const CardTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption2,
  lineHeight: '1.8'
}));
