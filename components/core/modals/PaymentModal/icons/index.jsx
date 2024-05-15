import AmericanExpress from '@/assets/CustomIcons/AmericanExpress';
import JCB from '@/assets/CustomIcons/JCB';
import MasterCard from '@/assets/CustomIcons/MasterCard';
import UnionPay from '@/assets/CustomIcons/UnionPay';
import VisaCardIcon from '@/assets/CustomIcons/VisaCardIcon';
import { Stack } from '@mui/material';

function PaymentIcons() {
  return (
    <Stack alignItems='center' direction='row'>
      <VisaCardIcon />
      <MasterCard />
      <JCB />
      <UnionPay />
      <AmericanExpress />
    </Stack>
  );
}

export default PaymentIcons;
