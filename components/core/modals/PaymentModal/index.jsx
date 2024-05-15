import { useTheme } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RoundedDialog } from '../../../styled/core';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY}`
);
const PaymentModal = ({ handleClose, open, update }) => {
  const onClose = () => {
    handleClose();
  };
  const theme = useTheme();

  return (
    <RoundedDialog
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: 'blur(3px)',
        '& .MuiPaper-root': {
          [theme.breakpoints.up('lg')]: {
            padding: '50px 30px 40px'
          },
          maxWidth: { sm: '500px' }
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '1rem',
          padding: '1rem'
        }
      }}
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm handleClose={handleClose} update={update} />
      </Elements>
    </RoundedDialog>
  );
};

export default PaymentModal;
