import Button from '@/components/core/Button';
import {
  useSubscribeProduct,
  useUnsubscribeProduct
} from '@/hooks/promptstudio';
import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { RoundedDialog } from '../../styled/core';

const PromptStudioModal = (props) => {
  const { product, handleSubscription, subscribed } = props;
  const theme = useTheme();
  const prompt_type = {
    1: 'Text Model',
    2: 'Media Model'
  };
  const onClose = () => {
    props.handleClose();
  };

  const { mutate: subscribeProduct, isLoading } = useSubscribeProduct(onClose);
  const { mutate: unsubscribeProduct, isLoading: unsubLoading } =
    useUnsubscribeProduct(onClose);

  const handleSubscribeProduct = () => {
    subscribeProduct({
      category_id: product?.category
    });
  };

  const handleUnsubscribeProduct = () => {
    unsubscribeProduct({
      category_id: product?.category
    });
  };

  return (
    <RoundedDialog
      open={props.open}
      onClose={onClose}
      maxWidth={'sm'}
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <Stack gap='1.5rem'>
        <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
          <Avatar
            alt={product?.title}
            src={'data:image/png;base64, ' + product?.logo}
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            variant='subHeading1'
            sx={{ wordWrap: 'break-word', overflow: 'hidden' }}
          >
            {product?.title || '--'}
          </Typography>
        </Stack>
        <Box sx={{ height: '1px', bgcolor: 'background.paper' }} />
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1} width={'49%'}>
            <Typography variant='body1' color='secondary.main'>
              Description
            </Typography>
            <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>
              {product?.description || '--'}
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body1' color='secondary.main'>
              Input Type
            </Typography>
            <Typography variant='body2'>
              {prompt_type[product?.descriptive_fields?.prompt_type] || '--'}
            </Typography>
          </Stack>
        </Stack>

        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body1' color='secondary.main'>
              Model
            </Typography>
            <Typography variant='body2'>
              {product?.products?.map(({ title }) => title).join(', ') || '--'}
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body1' color='secondary.main'>
              Category
            </Typography>
            <Typography variant='body2'>
              {product?.category__title || '--'}
            </Typography>
          </Stack>
        </Stack>
        {product?.descriptive_fields?.prompt_type === '2' && (
          <>
            <Stack gap={'0.5rem'} direction={'row'}>
              <Stack gap={'0.5rem'} flex={1}>
                <Typography variant='body1' color='secondary.main'>
                  Extenstion
                </Typography>
                <Typography variant='body2'>
                  {product?.descriptive_fields?.formats?.join(', ')}
                </Typography>
              </Stack>
              <Stack gap={'0.5rem'} flex={1}>
                <Typography variant='body1' color='secondary.main'>
                  Max Upload File Size (MB)
                </Typography>
                <Typography variant='body2'>
                  {product?.descriptive_fields?.maxsize || '--'}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={'0.5rem'} direction={'row'}>
              <Stack gap={'0.5rem'} flex={1}>
                <Typography variant='body1' color='secondary.main'>
                  Number Of Files
                </Typography>
                <Typography variant='body2'>
                  {product?.descriptive_fields?.media_limit || '--'}
                </Typography>
              </Stack>
            </Stack>
          </>
        )}

        <Toolbar>
          <Button
            variant={'contained'}
            color={'secondaryLight'}
            sx={{ padding: '.5rem 0rem', width: '100%' }}
            onClick={onClose}
          >
            <Typography variant='body1' component={'span'}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant={'contained'}
            sx={{ padding: '.5rem 0rem', width: '100%' }}
            loading={isLoading || unsubLoading}
            onClick={
              !product?.category__subscribed
                ? handleSubscribeProduct
                : handleUnsubscribeProduct
            }
            loadingSize={23}
            disabled={props.disabled}
          >
            <Typography variant='body1' component={'span'}>
              {product?.category__subscribed ? 'Unsubscribe' : 'Subscribe'}
            </Typography>
          </Button>
        </Toolbar>
      </Stack>
    </RoundedDialog>
  );
};

export default PromptStudioModal;

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));
