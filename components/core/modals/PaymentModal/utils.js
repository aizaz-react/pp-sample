import AmericanExpress from '@/assets/CustomIcons/AmericanExpress';
import JCB from '@/assets/CustomIcons/JCB';
import MasterCard from '@/assets/CustomIcons/MasterCard';
import UnionPay from '@/assets/CustomIcons/UnionPay';
import VisaCardIcon from '@/assets/CustomIcons/VisaCardIcon';
export const cardIcons = {
  visa: <VisaCardIcon />,
  mastercard: <MasterCard />,
  unionpay: <UnionPay />,
  jcb: <JCB />,
  amex: <AmericanExpress />
};
export const options = {
  style: {
    base: {
      color: '#fff'
    },
    invalid: {
      color: 'unset'
    }
  }
};
