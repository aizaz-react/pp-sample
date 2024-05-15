import CoreButton from '@/components/core/Button';
import { HelperText } from '@/components/core/OutlinedInput';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import styled from '@mui/system/styled';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useAddPayment,
  useCreatePaymentMethod
} from '../../../../hooks/payment';
import PaymentIcons from './icons';
import { cardIcons, options } from './utils';
const CheckoutForm = ({ handleClose, update }) => {
  const theme = useTheme();
  const element = useElements();
  const [card, setCard] = useState({
    number: {
      brand: '',
      error: null,
      empty: true
    },
    cvc: {
      error: null,
      empty: true
    },
    expiry: {
      error: null,
      empty: true
    }
  });
  const [focusElement, setFocusElement] = useState('');
  const updateCard = (key, data) => {
    setCard((prev) => ({ ...prev, [key]: data }));
  };
  const isDisabled = Object.keys(card).some(
    (key) => card[key].empty || !!card[key].error
  );
  const { mutateAsync: createPayment, isLoading: isCreating } =
    useCreatePaymentMethod();
  const { mutate, isLoading: isAdding } = useAddPayment(handleClose);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardNumber = element.getElement(CardNumberElement);
    const { paymentMethod, error } = await createPayment(cardNumber);
    if (error?.type == 'validation_error') return;
    if (error?.type === 'card_error') {
      toast.error(error.message);
      return;
    }
    mutate({ payment_method_id: paymentMethod.id });
  };

  return (
    <Form component='form' onSubmit={handleSubmit}>
      <Stack gap='10px'>
        <Typography variant='heading1'>
          {update ? 'Update Payment' : 'Add Payment'}
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: theme.palette.text.secondaryLight
          }}
        >
          {update
            ? 'Update payment method of your account'
            : 'Add payment method to your account'}
        </Typography>
      </Stack>
      <Stack gap='24px'>
        <Stack>
          <Stack gap='10px'>
            <Stack
              direction='row'
              width='100%'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='body1'>Card number</Typography>
              <PaymentIcons />
            </Stack>
            <CardElementContainer
              sx={{
                border: `1px solid ${
                  focusElement === 'cardNumber'
                    ? theme.palette.secondary.main
                    : theme.palette.divider
                }`
              }}
            >
              <CardNumberElement
                options={{ ...options, placeholder: 'XXXX XXXX XXXX XXXX' }}
                onChange={(e) => {
                  const { brand, error, empty } = e;
                  updateCard('number', { brand, error, empty });
                }}
                onFocus={(e) => {
                  setFocusElement(e.elementType);
                }}
              />
              <IconContainer>{cardIcons[card.number.brand]}</IconContainer>
            </CardElementContainer>
          </Stack>
          <HelperText
            isAbsolute
            helperText={card.number.error?.message || ''}
            sx={{ fontSize: '0.8rem' }}
          />
        </Stack>
        <InputContainer direction='row' gap='1rem'>
          <Stack flex='1'>
            <Stack flex='1' gap='10px'>
              <Typography variant='body1'>Expiry Date</Typography>

              <CardElementContainer
                sx={{
                  border: `1px solid ${
                    focusElement === 'cardExpiry'
                      ? theme.palette.secondary.main
                      : theme.palette.divider
                  }`
                }}
              >
                <CardExpiryElement
                  options={options}
                  onChange={(e) => {
                    const { empty, error } = e;
                    updateCard('expiry', { empty, error });
                  }}
                  onFocus={(e) => {
                    setFocusElement(e.elementType);
                  }}
                />
              </CardElementContainer>
            </Stack>
            <HelperText
              isAbsolute
              helperText={card.expiry.error?.message || ''}
            />
          </Stack>
          <Stack flex='1'>
            <Stack flex='1' gap='10px'>
              <Typography variant='body1'>CVC</Typography>

              <CardElementContainer
                sx={{
                  border: `1px solid ${
                    focusElement === 'cardCvc'
                      ? theme.palette.secondary.main
                      : theme.palette.divider
                  }`
                }}
              >
                <CardCvcElement
                  options={options}
                  onChange={(e) => {
                    const { error, empty } = e;
                    updateCard('cvc', { empty, error });
                  }}
                  onFocus={(e) => {
                    setFocusElement(e.elementType);
                  }}
                />
              </CardElementContainer>
            </Stack>
            <HelperText isAbsolute helperText={card.cvc.error?.message || ''} />
          </Stack>
        </InputContainer>
        <Typography
          variant='body2'
          sx={{ color: theme.palette.text.secondary }}
        >
          Secure payment certified. Powered by Prompt privacy
        </Typography>
      </Stack>
      <Stack direction='row' gap='20px' justifyContent='space-between'>
        <Button
          onClick={handleClose}
          variant='contained'
          sx={{
            flexBasis: '50%',
            backgroundColor: `${theme.palette.background.paper}10`,
            color: '#fff',
            boxShadow: 'none',
            '&:hover': { backgroundColor: theme.palette.background.paper },
            fontSize: '1rem'
          }}
        >
          Cancel
        </Button>
        <CoreButton
          sx={{ flexBasis: '50%', fontSize: '1rem' }}
          variant='contained'
          loading={isCreating || isAdding}
          disabled={isDisabled}
          type='submit'
        >
          Save
        </CoreButton>
      </Stack>
    </Form>
  );
};
const Form = styled(Stack)(() => ({
  gap: '40px'
}));
const CardElementContainer = styled(Box)(({ theme }) => ({
  padding: '.6rem 1rem',
  borderRadius: '4px',
  minHeight: '16px',
  position: 'relative'
}));
const InputContainer = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '24px'
  }
}));
const IconContainer = styled('span')({
  position: 'absolute',
  right: '3px',
  top: '50%',
  transform: 'translateY(-50%)'
});
export default CheckoutForm;
