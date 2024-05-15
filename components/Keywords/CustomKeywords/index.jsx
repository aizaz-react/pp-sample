'use client';
import NoData from '@/assets/CustomIcons/NoData';
import SearchInput from '@/components/core/SearchInput';
import { CustomSwitch } from '@/components/styled/core';
import { useDebounce } from '@/hooks/custom';
import {
  useChangeStatusKeywordList,
  useGetCustomKeywords
} from '@/hooks/keywords';
import { pxToRem } from '@/utils/theme';
import {
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import Button from '../../core/Button';
import KeywordModal from '../../core/modals/KeywordsModal';
import DeleteBtn from './DeleteBtn';

export default function CustonmKeywords() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedLoading, setSelectedLoading] = useState(null);
  const [search, setSearch] = useState('');
  const searchString = useDebounce(search, 600);
  const { data, isLoading } = useGetCustomKeywords({ search: searchString });

  const { mutate: changeStatus, isLoading: loading } =
    useChangeStatusKeywordList();
  const handleChangeStatus = (list) => {
    setSelectedLoading(list.id);
    changeStatus({ id: list.id, is_active: !list.is_active });
  };

  const handleOpen = (data) => {
    setSelected(data || null);
    setOpen(true);
  };

  const exportCSV = (data) => {
    const blob = new Blob(
      [['keyword: '], data.keywords.map((keyword) => [keyword])],
      { type: 'text/plain;charset=utf-8,' }
    );

    const objUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = objUrl;

    link.download = data.name + '.txt';

    link.click();
  };

  return (
    <Stack width={'100%'}>
      <Toolbar>
        <LeftSection>
          <Typography
            component={'h1'}
            variant='subHeading1'
            color={'text.primary'}
            noWrap
          >
            Custom Keywords
          </Typography>
          <InputWrapper>
            <SearchInput
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </InputWrapper>
        </LeftSection>
        <RightSection direction={'row'} gap={'1rem'} alignItems={'center'}>
          <Button
            variant='contained'
            sx={{
              px: '1.2rem',
              py: '0.3rem',
              [theme.breakpoints.down('md')]: {
                width: '100%'
              }
            }}
            onClick={() => handleOpen()}
          >
            <Typography variant='body2'>+ Add List</Typography>
          </Button>
        </RightSection>
      </Toolbar>
      {!!data?.result.length
        ? data?.result?.map((item, index) => (
            <TableWrapper mt={3} key={index}>
              <Stack p={pxToRem(20)} gap={'1rem'}>
                <Toolbar>
                  <SwitchWrapper>
                    <Typography variant='subHeading2' color='text.primary'>
                      {item?.name}
                    </Typography>
                    <Stack
                      className='switch'
                      direction='row'
                      alignItems='center'
                    >
                      <CustomSwitch
                        sx={{ m: 1 }}
                        checked={item.is_active}
                        disabled={loading && selectedLoading === item.id}
                        onChange={() => handleChangeStatus(item)}
                      />
                      <CircularProgress
                        size={20}
                        sx={{
                          display:
                            loading && selectedLoading === item.id
                              ? 'block'
                              : 'none'
                        }}
                      />
                    </Stack>
                  </SwitchWrapper>
                  <RightSection>
                    <ActionButton
                      onClick={() => handleOpen(item)}
                      sx={{ height: '32px', width: '32px' }}
                    >
                      <EditIcon />
                    </ActionButton>
                    <ActionButton
                      onClick={() => exportCSV(item)}
                      sx={{ height: '32px', width: '32px' }}
                    >
                      <DownloadIcon />
                    </ActionButton>
                    <DeleteBtn id={item.id} IconButton={ActionButton} />
                  </RightSection>
                </Toolbar>
                <Stack
                  maxHeight={'200px'}
                  overflow={'auto'}
                  direction={'row'}
                  flexWrap={'wrap'}
                  gap={'1rem'}
                >
                  {item?.keywords?.map((text, index) => (
                    <Button
                      key={index}
                      color={'secondary'}
                      disableRipple
                      sx={{
                        background: `${theme.palette.background.paper}20`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {text}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </TableWrapper>
          ))
        : !isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                py: '3rem',
                gap: '1rem',
                height: 'calc(100vh - 203px)'
              }}
            >
              <NoData
                width={matches ? pxToRem(100) : pxToRem(150)}
                height={matches ? pxToRem(100) : pxToRem(150)}
              />
              <NoResult variant={'body1'}>No result found</NoResult>
            </Box>
          )}
      {isLoading && (
        <TableWrapper mt={3}>
          <Stack direction={'row'} flexWrap={'wrap'} gap={'1rem'} p={'1rem'}>
            <Toolbar>
              <Stack direction={'row'} alignItems={'center'} gap={'1rem'}>
                <Skeleton
                  variant='rectangular'
                  width={'10rem'}
                  height={'2rem'}
                />
                <Skeleton variant='circle' width={'5rem'} height={'2rem'} />
              </Stack>
              <RightSection>
                <Skeleton
                  variant='circle'
                  width={'2rem'}
                  height={'2rem'}
                  sx={{ borderRadius: '1rem' }}
                />
                <Skeleton
                  variant='circle'
                  width={'4rem'}
                  height={'2rem'}
                  sx={{ borderRadius: '1rem' }}
                />
              </RightSection>
            </Toolbar>

            {new Array(4).fill('').map((text, index) => (
              <Skeleton
                key={index}
                variant='rectangular'
                width={'10rem'}
                height={'2rem'}
              />
            ))}
          </Stack>
        </TableWrapper>
      )}
      <KeywordModal
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        selected={selected}
      />
    </Stack>
  );
}

const SwitchWrapper = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-between',
    width: '100%',
    '& .switch': {
      flexDirection: 'row-reverse'
    }
  }
}));

const TableWrapper = styled(Box)(({ theme }) => ({
  marginTop: '2rem',
  borderRadius: '16px',
  background: `${theme.palette.background.paper}20`,
  border: `1px solid ${theme.palette.divider}30`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxHeight: '75vh',
  overflow: 'auto'
}));

const Toolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const LeftSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  }
}));

const NoResult = styled(Typography)(({ theme }) => ({
  ...theme.typography.heading2,
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.4rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem'
  }
}));
const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondaryLight.main,
  borderRadius: '8px'
}));
const EditIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='none'
    viewBox='0 0 16 16'
  >
    <path
      fill='#E39E36'
      fillRule='evenodd'
      d='M5.668 15.136l7.81-10.1c.425-.545.575-1.174.434-1.816-.123-.582-.481-1.137-1.019-1.557L11.583.62C10.44-.286 9.025-.19 8.214.851l-.878 1.138a.336.336 0 00.057.467s2.217 1.777 2.264 1.816c.15.143.264.334.292.563a.84.84 0 01-.726.927.752.752 0 01-.575-.162l-2.33-1.854a.278.278 0 00-.378.048L.405 10.96c-.359.45-.481 1.032-.359 1.596l.708 3.067c.037.163.179.277.349.277l3.112-.038a1.87 1.87 0 001.453-.726zm4.359-.955h5.075c.496 0 .898.408.898.91s-.402.91-.898.91h-5.075a.904.904 0 01-.898-.91c0-.502.403-.91.898-.91z'
      clipRule='evenodd'
    ></path>
  </svg>
);
const DownloadIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='none'
    viewBox='0 0 18 18'
  >
    <path
      stroke='#429CBD'
      strokeLinecap='round'
      strokeWidth='1.6'
      d='M9 .85v10.286M6.144 8.279L9 11.136M11.857 8.279L9 11.136M17 10.907v5.143c0 .631-.614 1.143-1.371 1.143H2.37C1.614 17.193 1 16.68 1 16.05v-5.143'
    ></path>
  </svg>
);
const InputWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));
