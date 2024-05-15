import Button from '@/components/core/Button';
import { ChatContext } from '@/components/hoc/ChatContext';
import { useGetCompany } from '@/hooks/company';
import {
  useSubscribeProduct,
  useUnsubscribeProduct
} from '@/hooks/marketplace';
import {
  Avatar,
  Box,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import MarketplaceModal from '../core/modals/MarketplaceModal';
import SubscribeModal from '../core/modals/SubscribeModal';

const Card = (props) => {
  const { data: company } = useGetCompany();
  const isManager = company?.is_manager;
  const theme = useTheme();
  const { title, description, price, logo, id, is_active, subscribed, slug } =
    props;
  const [open, setOpen] = useState(false);
  const [openSubscription, setOpenSubscription] = useState(false);
  const { setSlug } = useContext(ChatContext);
  const handleCloseSubscription = useCallback(() => {
    setOpenSubscription(false);
  }, []);
  const updateSlug = () => {
    const model = sessionStorage?.getItem('modal');
    const activeSlug = JSON.parse(model !== 'undefined' ? model : null);
    if (subscribed) {
      if (slug === activeSlug) {
        sessionStorage.setItem('modal', '');
      }
    }
  };
  const handleOpenSubscription = useCallback(() => {
    setOpenSubscription(true);
    setOpen(false);
  }, []);

  const { mutate: subscribeProduct, isLoading } = useSubscribeProduct(
    handleCloseSubscription
  );
  const { mutate: unsubscribeProduct, isLoading: unsubLoading } =
    useUnsubscribeProduct(() => {
      handleCloseSubscription();
      updateSlug();
    });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = () => setOpen(true);

  const handleSubscribeProduct = () => {
    subscribeProduct({
      product_id: id
    });
  };

  const handleUnsubscribeProduct = () => {
    unsubscribeProduct({
      product_id: id
    });
  };

  return (
    <Stack
      gap={'1.5rem'}
      sx={{
        padding: '1rem',
        border: '1px solid #bfbfbf30',
        borderRadius: '1rem',
        bgcolor: !is_active && theme.palette.text.secondaryLight + '10'
      }}
    >
      <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
        <Avatar
          alt={title}
          src={'data:image/png;base64, ' + logo}
          sx={{ width: 40, height: 40 }}
        />
        <Typography
          title={title}
          variant='body1'
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
        >
          {title}
        </Typography>
      </Stack>
      <Stack gap={'0.5rem'} flex={1}>
        <Typography variant='body2' color='secondary.main'>
          Description
        </Typography>
        <Description variant={'caption1'}>{description}</Description>
      </Stack>
      <Toolbar>
        {isManager && (
          <Button
            variant={'contained'}
            color={subscribed ? 'secondaryLight' : 'primary'}
            sx={{
              padding: '.4rem 2rem',
              width: 'auto',
              bgcolor: subscribed && 'background.paper',
              [theme.breakpoints.down('sm')]: {
                width: '100%'
              }
            }}
            disabled={!is_active}
            onClick={() => setOpenSubscription(true)}
          >
            <Typography variant='body2' component={'span'}>
              {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Typography>
          </Button>
        )}
        <Button
          variant={'contained'}
          color={'secondaryLight'}
          sx={{
            padding: '.4rem 0rem',
            width: '100%',
            backgroundColor: theme.palette.background.paper + '20'
          }}
          disabled={!is_active}
          onClick={handleOpen}
        >
          <Typography variant='body2' component={'span'}>
            View Info & Pricing
          </Typography>
        </Button>
      </Toolbar>
      <MarketplaceModal
        open={open}
        isManager={isManager}
        handleClose={handleClose}
        product={props}
        subscribed={subscribed}
        handleOpenSubscription={handleOpenSubscription}
      />
      <SubscribeModal
        open={openSubscription}
        handleClose={handleCloseSubscription}
        title={`${subscribed ? 'Unsubscribe' : 'Subscribe'} to ${title}`}
        logo={logo}
        message={`Are you sure you want to ${
          subscribed ? 'unsubscribe' : 'subscribe'
        } ${title}? `}
        buttonText={subscribed ? 'Unsubscribe' : 'Subscribe'}
        confirm={subscribed ? handleUnsubscribeProduct : handleSubscribeProduct}
        loading={isLoading || unsubLoading}
      />
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
