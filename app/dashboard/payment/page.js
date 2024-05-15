'use client';
import { DataTable } from '@/components/core/DataTable';
import DonutChart from '@/components/payment/DonutChart';
import PaymentCard from '@/components/payment/PaymentCard';
import { PaginationSection } from '@/components/styled/core';
import { pxToRem } from '@/utils/theme';
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Pagination,
  Skeleton,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import moment from 'moment';
import { useCallback, useState } from 'react';
import NoCard from '@/assets/CustomIcons/NoCard';
import PaymentModal from '@/components/core/modals/PaymentModal';
import {
  useGetCard,
  useGetStats,
  useGetTransactionHistory
} from '@/hooks/payment';

export default function Home() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:400px)');
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback((newOpen) => {
    setOpen(newOpen);
  }, []);

  const handlePageChange = (e, page) => {
    setPage(() => page);
  };

  const formatDateTime = (inputTimestamp) => {
    const formattedDateTime =
      moment(inputTimestamp).format('YYYY-MM-DD / HH:mm');

    return formattedDateTime;
  };
  const { data: card, isLoading: loading } = useGetCard();

  const { data: transactions, isLoading: transactionLoading } =
    useGetTransactionHistory({
      id: null,
      page: page
    });

  const { data: stats, isLoading: statsLoading } = useGetStats();

  const columns = [
    {
      field: 'create_ts',
      headerName: 'Date/Time',
      flex: 0.5,
      minWidth: 150,
      renderCell: ({ row }) => formatDateTime(row.create_ts)
    },
    {
      field: 'id',
      headerName: 'Transaction ID',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'paid_amount',
      headerName: 'Bill',
      minWidth: 120,
      flex: 0.5,
      renderCell: ({ row }) => `$ ${row.paid_amount?.toFixed(2)}`
    },

    {
      field: '',
      headerName: 'Type',
      minWidth: 120,
      flex: 0.5,
      renderCell: () => <Chip>PAID</Chip>
    }
  ];

  return (
    <Main>
      <Stack gap={'2rem'}>
        <Toolbar>
          <LeftToolbar>
            <Typography
              component={'h1'}
              variant='subHeading1'
              color={'text.primary'}
            >
              Payment Management
            </Typography>
          </LeftToolbar>
          {card?.payment_method ? (
            <Typography
              variant='body2'
              sx={{
                display: 'flex',
                marginRight: '1rem',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              Pending Billables:
              {transactions?.pending_payment ||
              transactions?.pending_payment === 0 ? (
                <Typography variant='subHeading1' color={'error'}>
                  {`$${parseFloat(transactions.pending_payment.toFixed(1))}`}
                </Typography>
              ) : (
                ''
              )}
            </Typography>
          ) : (
            !loading && (
              <Button variant={'contained'} sx={{ px: pxToRem(32) }}>
                <Typography variant='body1' onClick={() => setOpen(true)}>
                  Add Payment
                </Typography>
              </Button>
            )
          )}
        </Toolbar>
        {statsLoading || loading ? (
          <PaymentWrapper sx={{ justifyContent: 'center' }}>
            <PaymentSection>
              <Skeleton variant='rounded' width={'100%'} height={pxToRem(45)} />
              <Skeleton variant='rounded' width={'100%'} height={pxToRem(45)} />
              <Skeleton variant='rounded' width={'100%'} height={pxToRem(45)} />
              <Skeleton variant='rounded' width={'100%'} height={pxToRem(45)} />
              <Skeleton variant='rounded' width={'100%'} height={pxToRem(45)} />
            </PaymentSection>
          </PaymentWrapper>
        ) : card?.payment_method ? (
          <PaymentWrapper>
            <PaymentGrid>
              <PaymentCard data={card} setOpen={handleOpen} />
              <DonutChart stats={stats} />
            </PaymentGrid>

            <DataTable
              columns={columns}
              rows={!!transactions?.result ? transactions?.result : []}
              loading={transactionLoading}
              autoHeight
              disableColumnMenu
              disableColumnFilter
              hideFooter
              hideFooterSelectedRowCount={true}
              rowHeight={50}
              rowSelection={false}
              disableSelectionOnClick
              getRowId={(row) => row.id}
              className={'payment-table'}
              slots={{
                loadingOverlay: LinearProgress
              }}
              sx={{
                maxWidth: '100%',

                '&.MuiDataGrid-root': {
                  border: 'none',
                  minHeight: 'unset'
                },

                '& .MuiDataGrid-virtualScroller': {
                  maxHeight: 'calc(100vh - 620px)',
                  overflowY: 'auto !important',
                  overflowX: 'hidden'
                },
                '@media (max-width: 620px)': {
                  '& .MuiDataGrid-virtualScroller': {
                    overflowX: 'auto'
                  }
                }
              }}
            />
            <PaginationSection>
              <Pagination
                siblingCount={0}
                boundaryCount={1}
                variant='outlined'
                shape='rounded'
                onChange={handlePageChange}
                count={Math.ceil(
                  (transactions?.total_count || 1) /
                    (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15)
                )}
                page={page}
                color='standard'
              />
            </PaginationSection>
          </PaymentWrapper>
        ) : (
          <PaymentWrapper
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <NoCard />
            <Typography variant='body1'>No payment found</Typography>
          </PaymentWrapper>
        )}
      </Stack>

      <PaymentModal
        open={open}
        handleClose={handleClose}
        update={card?.payment_method}
      />
    </Main>
  );
}

const Main = styled(Box)(({ theme }) => ({
  width: 'calc(100vw - 300px)',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    padding: '2rem 1rem',
    width: '100%'
  }
}));

const PaymentSection = styled(Container)(() => ({
  display: 'flex',

  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem'
}));

const PaymentWrapper = styled(Box)(({ theme }) => ({
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}30`,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  minHeight: '70vh',
  [theme.breakpoints.down('lg')]: {
    padding: pxToRem(16)
  }
}));

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

const LeftToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& p': {
      flex: 1
    }
  }
}));

const PaymentGrid = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '3rem',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
  alignItems: 'center'
}));

const Chip = styled(Box)(({ theme }) => ({
  padding: '0.25rem 0.9rem',
  borderRadius: '20px',
  color: '#429CBD',
  background: `#275D7130`,
  textTransform: 'capitalize',
  display: 'grid',
  placeContent: 'center',
  ...theme.typography.caption1
}));
