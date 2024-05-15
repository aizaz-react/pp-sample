import Button from '@/components/core/Button';
import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { RoundedDialog } from '../../styled/core';

const MarketplaceModal = ({
  product,
  handleOpenSubscription,
  subscribed,
  ...props
}) => {
  const {
    title,
    description,
    price,
    logo,
    id,
    is_active,
    slug,
    language_support,
    class: productClass,
    training_tokens,
    truthfulqa,
    source,
    emissions_tCO2eq,
    context_length,
    developer,
    parameters,
    product_type
  } = product;
  const theme = useTheme();

  const onClose = () => {
    props.handleClose();
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
          <Stack
            sx={{
              bgcolor: 'background.paper',
              borderRadius: '50px'
            }}
            minWidth={'50px'}
            height={'50px'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Avatar
              alt={title}
              src={'data:image/png;base64, ' + logo}
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
          <Typography
            variant='subHeading1'
            sx={{ overflowX: 'hidden', wordWrap: 'break-word' }}
          >
            {title || '--'}
          </Typography>
        </Stack>
        <Box sx={{ height: '1px', bgcolor: 'background.paper' }} />
        <Stack gap={'0.5rem'}>
          <Typography variant='body2' color='secondary.main'>
            Description
          </Typography>
          <Typography
            variant='caption1'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: '2'
            }}
          >
            {description || '--'}
          </Typography>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Cost
            </Typography>
            <Typography variant='caption1'>
              ${price || '--'} / 1,000 Tokens
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Slug
            </Typography>
            <Typography variant='caption1'>{slug || '--'}</Typography>
          </Stack>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Language Support
            </Typography>
            <Typography variant='caption1'>
              {[language_support]?.flat()?.join(',') || '--'}
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Class
            </Typography>
            <Typography variant='caption1'>{productClass || '--'}</Typography>
          </Stack>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Training Tokens
            </Typography>
            <Typography variant='caption1'>
              {training_tokens || '--'}
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Source
            </Typography>
            <Typography variant='caption1'>{source || '--'}</Typography>
          </Stack>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Emissions tCO2eq
            </Typography>
            <Typography variant='caption1'>
              {emissions_tCO2eq || '--'}
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Context Length
            </Typography>
            <Typography variant='caption1'>{context_length || '--'}</Typography>
          </Stack>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              TruthfulQA
            </Typography>
            <Typography variant='caption1'>{truthfulqa || '--'}</Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Developer
            </Typography>
            <Typography variant='caption1'>{developer || '--'}</Typography>
          </Stack>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Parameters
            </Typography>
            <Typography variant='caption1'>{parameters || '--'}</Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Type
            </Typography>
            <Typography variant='caption1'>
              {product_type === 2 ? 'Text to text' : 'Text to image' || '--'}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={'0.5rem'} direction={'row'}>
          <Stack gap={'0.5rem'} flex={1}>
            <Typography variant='body2' color='secondary.main'>
              Category
            </Typography>
            <Typography variant='caption1'>
              {product.category || 'Others'}
            </Typography>
          </Stack>
          <Stack gap={'0.5rem'} flex={1} />
        </Stack>
        <Toolbar>
          <Button
            variant={'contained'}
            color={'secondaryLight'}
            sx={{ padding: '.7rem 0rem', width: '100%' }}
            onClick={onClose}
          >
            <Typography variant='body1' component={'span'}>
              Cancel
            </Typography>
          </Button>
          {props.isManager && (
            <Button
              variant={'contained'}
              sx={{ padding: '.7rem 0rem', width: '100%' }}
              onClick={handleOpenSubscription}
            >
              <Typography variant='body1' component={'span'}>
                {subscribed ? 'Unsubscribe' : 'Subscribe'}
              </Typography>
            </Button>
          )}
        </Toolbar>
      </Stack>
    </RoundedDialog>
  );
};

export default MarketplaceModal;

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
