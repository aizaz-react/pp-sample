'use client';
import DeleteIcon from '@/assets/CustomIcons/DeleteLogo';
import EditIcon from '@/assets/CustomIcons/EditIconFilled';
import NoStudioIcon from '@/assets/CustomIcons/NoStudioIcon';
import Button from '@/components/core/Button';
import SearchInput from '@/components/core/SearchInput';
import DeleteModal from '@/components/core/modals/DeleteModal';
import Card from '@/components/promptstudio/Card';
import { CardWrapper, CustomSwitch } from '@/components/styled/core';
import { useDebounce } from '@/hooks/custom';
import {
  useCompanyStudioProducts,
  useDeleteProduct,
  useUpdateCategory,
  useUpdateProduct
} from '@/hooks/promptstudio';
import {
  Box,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ActionButton from '../core/buttons/ActionButton';
import { useState } from 'react';

const OverView = () => {
  const theme = useTheme();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const searchString = useDebounce(search, 600);
  const queryClient = useQueryClient();

  const handleClose = () => {
    setSelected(null);
    setOpenDelete(false);
  };

  const { data, isLoading } = useCompanyStudioProducts({
    search: searchString
  });

  const { mutate: updateProduct, isLoading: updateLoading } = useUpdateProduct(
    () => null
  );

  const { mutate: updateCategory, isLoading: categoryLoading } =
    useUpdateCategory(() => null);

  const { mutate: deletePrompt, isLoading: deleteLoading } = useDeleteProduct({
    callback: handleClose
  });

  const convertData = (data) => {
    return data?.results
      ? data?.results?.reduce((accumulator, rest) => {
          accumulator[rest?.category__title] = [
            ...(accumulator[rest?.category__title] || []),
            rest
          ];
          return accumulator;
        }, {})
      : {};
  };

  const handleEditOpen = (data) => {
    const key = ['studio-product', data.id];
    const prompt = queryClient.getQueryData(key);
    if (!prompt) queryClient.setQueryData(key, { result: data });
    router.push(`/dashboard/promptstudio/company/${data.id}`);
  };

  const handleDeleteOpen = (data) => {
    setSelected(data);
    setOpenDelete(true);
  };

  const handleDelete = () => {
    deletePrompt(selected?.id);
  };

  const handleCategoryStatus = (data) => {
    updateCategory({
      category_id: data.category,
      is_active: !data.category__is_active
    });
  };

  const handleStatus = (data) => {
    updateProduct({
      prompt_id: data.id,
      is_active: !data.is_active
    });
  };

  return (
    <Main
      gap={'1rem'}
      sx={{
        padding: 0
      }}
    >
      <Toolbar>
        <Toolbar
          sx={{
            justifyContent: 'flex-start',
            gap: '2rem',
            width: 'auto',
            [theme.breakpoints.down('sm')]: {
              width: '100%'
            }
          }}
        >
          <Typography
            component={'h1'}
            variant='subHeading1'
            color={'text.primary'}
            width={'fit-content'}
          >
            Prompt Management
          </Typography>
          <InputWrapper>
            <SearchInput
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </InputWrapper>
        </Toolbar>

        <Box
          className='LinkWrapperBox'
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: '100%'
            }
          }}
        >
          <Link
            href='/dashboard/promptstudio/company/AddPrompt'
            className='text-decoration-none'
          >
            <Button
              sx={{
                height: '32.75px',
                width: 'auto',
                [theme.breakpoints.down('sm')]: {
                  width: '100%'
                },
                px: '1rem'
              }}
              variant={'contained'}
            >
              <Typography noWrap sx={{ color: '#041218' }}>
                Add Prompt
              </Typography>
            </Button>
          </Link>
        </Box>
      </Toolbar>
      {isLoading ? (
        <CardWrapper>
          {new Array(4).fill('').map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </CardWrapper>
      ) : !!Object.entries(convertData(data)).length ? (
        Object.entries(convertData(data)).map(([title, value], i) => (
          <Stack gap={'1rem'} key={i}>
            {i !== 0 && (
              <Divider sx={{ borderColor: theme.palette.divider + '30' }} />
            )}
            <Toolbar
              className='ToolBarBox'
              sx={{
                justifyContent: 'flex-start',
                gap: '2rem',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'row'
                }
              }}
            >
              <Typography
                component={'h1'}
                variant='subHeading2'
                color={'text.primary'}
                width={'fit-content'}
              >
                {title}
              </Typography>

              <Stack direction='row' gap='0.5rem'>
                <CustomSwitch
                  disabled={categoryLoading}
                  checked={value[0].category__is_active}
                  onChange={() => handleCategoryStatus(value[0])}
                  sx={{
                    width: 32,
                    height: 16,
                    '& .MuiSwitch-switchBase': {
                      transitionDuration: '300ms',
                      '&.Mui-checked': {
                        transform: 'translateX(16px)'
                      }
                    },
                    '& .MuiSwitch-thumb': {
                      boxSizing: 'border-box',
                      width: 12,
                      height: 12
                    }
                  }}
                />
                {categoryLoading ? <CircularProgress size='16px' /> : ''}
              </Stack>
            </Toolbar>
            <CardWrapper>
              {value.map((product, index) => (
                <Card
                  key={index}
                  {...product}
                  status={
                    <Stack direction='row' gap='0.5rem'>
                      <CustomSwitch
                        disabled={updateLoading}
                        checked={product.is_active}
                        onChange={() => handleStatus(product)}
                        sx={{
                          width: 32,
                          height: 16,
                          '& .MuiSwitch-switchBase': {
                            transitionDuration: '300ms',
                            '&.Mui-checked': {
                              transform: 'translateX(16px)'
                            }
                          },
                          '& .MuiSwitch-thumb': {
                            boxSizing: 'border-box',
                            width: 12,
                            height: 12
                          }
                        }}
                      />
                      {updateLoading ? <CircularProgress size='16px' /> : ''}
                    </Stack>
                  }
                >
                  <Toolbar>
                    <Typography
                      component={'p'}
                      noWrap
                      title={product.products
                        .map(({ title }) => title)
                        .join(', ')}
                    >
                      Modal:{' '}
                      <Typography component={'span'}>
                        {product.products.map(({ title }) => title).join(', ')}
                      </Typography>
                    </Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
                      <ActionButton
                        action='edit'
                        onClick={() => handleEditOpen(product)}
                      />

                      <ActionButton
                        action='delete'
                        onClick={() => handleDeleteOpen(product)}
                      />
                    </Stack>
                  </Toolbar>
                </Card>
              ))}
            </CardWrapper>
          </Stack>
        ))
      ) : (
        <Stack
          alignItems={'center'}
          gap={'1rem'}
          height={'70vh'}
          justifyContent={'center'}
          sx={{
            outline: '1px solid #BFBFBF30',
            borderRadius: '1rem'
          }}
        >
          <NoStudioIcon />
          <Typography variant={'body1'}>No product found</Typography>
        </Stack>
      )}
      <DeleteModal
        open={openDelete}
        handleClose={handleClose}
        title={'Delete Prompt'}
        message={`Are you sure you want to delete this Prompt?`}
        confirm={handleDelete}
        loading={deleteLoading}
      />
    </Main>
  );
};

export default OverView;

const Main = styled(Stack)(({ theme }) => ({
  padding: '2rem 0rem'
}));

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const SkeletonCard = () => (
  <Stack
    gap={'2rem'}
    sx={{
      padding: '1rem',
      border: '1px solid #bfbfbf30',
      borderRadius: '1rem'
    }}
  >
    <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
      <Skeleton variant='circular' width={40} height={40} />
      <Skeleton variant='text' sx={{ fontSize: '3.5rem', width: '4rem' }} />
    </Stack>
    <Stack gap={'0.5rem'}>
      <Typography variant='body1' color='secondary.main'>
        <Skeleton variant='text' sx={{ fontSize: '2.5rem' }} />
      </Typography>
      <Description>
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
      </Description>
    </Stack>
    <Toolbar>
      <Skeleton variant='text' sx={{ fontSize: '2.5rem' }} />
    </Toolbar>
  </Stack>
);

const Description = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical'
}));

const StyledIconButton = styled('button')(({ theme }) => ({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  borderRadius: '1rem',
  width: '1.75rem',
  height: '1.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
