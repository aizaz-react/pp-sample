'use client';
import DeleteLogo from '@/assets/CustomIcons/DeleteLogo';
import Button from '@/components/core/Button';
import { DataTable, TableWrapper } from '@/components/core/DataTable';
import DeleteModal from '@/components/core/modals/DeleteModal';
import UserModal from '@/components/core/modals/UserModal';
import SearchInput from '@/components/core/SearchInput';
import ChangeStatus from '@/components/dashboard/ChangeStatus';
import { PaginationSection } from '@/components/styled/core';
import UserFilter from '@/components/users/filter';
import ReInviteBtn from '@/components/users/reinviteBtn';
import { ROLE_TYPE } from '@/utils/constants';
import { pxToRem } from '@/utils/theme';
import {
  Box,
  IconButton,
  LinearProgress,
  Pagination,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';

const sampleData = [
  {
    id: 1,
    user__full_name: 'John Doe',
    user__email: 'john.doe@example.com',
    role: 1,
    status: false
  },
  {
    id: 2,
    user__full_name: 'Jane Smith',
    user__email: 'jane.smith@example.com',
    role: 2,
    status: true
  },
  {
    id: 3,
    user__full_name: 'Alice Johnson',
    user__email: 'alice.johnson@example.com',
    role: 2,
    status: false
  },
  {
    id: 4,
    user__full_name: 'Bob Brown',
    user__email: 'bob.brown@example.com',
    role: 1,
    status: true
  },
  {
    id: 5,
    user__full_name: 'Eve Wilson',
    user__email: 'eve.wilson@example.com',
    role: 1,
    status: false
  },
  {
    id: 6,
    user__full_name: 'Michael Jackson',
    user__email: 'michael.jackson@example.com',
    role: 2,
    status: true
  },
  {
    id: 7,
    user__full_name: 'Emily White',
    user__email: 'emily.white@example.com',
    role: 1,
    status: false
  },
  {
    id: 8,
    user__full_name: 'David Lee',
    user__email: 'david.lee@example.com',
    role: 2,
    status: true
  },
  {
    id: 9,
    user__full_name: 'Olivia Harris',
    user__email: 'olivia.harris@example.com',
    role: 2,
    status: false
  },
  {
    id: 10,
    user__full_name: 'William Clark',
    user__email: 'william.clark@example.com',
    role: 1,
    status: true
  },
  {
    id: 11,
    user__full_name: 'Sophia Martinez',
    user__email: 'sophia.martinez@example.com',
    role: 1,
    status: false
  },
  {
    id: 12,
    user__full_name: 'James Thompson',
    user__email: 'james.thompson@example.com',
    role: 2,
    status: true
  },
  {
    id: 13,
    user__full_name: 'Ava Robinson',
    user__email: 'ava.robinson@example.com',
    role: 1,
    status: false
  },
  {
    id: 14,
    user__full_name: 'Benjamin Evans',
    user__email: 'benjamin.evans@example.com',
    role: 2,
    status: true
  },
  {
    id: 15,
    user__full_name: 'Charlotte Cooper',
    user__email: 'charlotte.cooper@example.com',
    role: 2,
    status: false
  }
];


export default function Home() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(sampleData.slice(0, 10));
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [status, setStatus] = useState(null);

  const columns = [
    {
      field: 'user__full_name',
      headerName: 'Username',
      flex: 1,
      minWidth: 200,
      valueGetter: ({ row }) => row?.user__full_name || '-- --'
    },
    {
      field: 'user__email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 160,
      valueGetter: ({ row }) => ROLE_TYPE[row.role]
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 160,
      renderCell: ({ row }) => {
        if (row.user__is_pending) return <Chip color='warn'>Pending</Chip>;
        return (
          <ChangeStatus
            {...row}
            changeStatus={() => null}
            isLoading={false}
            selectedId={selected?.user}
            disabled={row?.is_superuser}
          />
        );
      }
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 0.3,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Stack
          sx={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <IconButton
            color='error'
            onClick={() => {
              setSelected(row);
              setOpenDelete(true);
            }}
          >
            <DeleteLogo />
          </IconButton>
          {row.user__is_pending && <ReInviteBtn userId={row.user} />}
        </Stack>
      )
    }
  ];

  const handleOpenUser = () => setOpenUser(true);

  const handleCloseUser = useCallback(() => {
    setOpenUser(false);
  }, [setOpenUser]);

  const handleClose = () => setOpenDelete(false);

  const handlePageChange = (e, page) => {
    const initial = (page - 1) * 10;
    setData(sampleData.slice(initial, initial + 10))
    setPage(() => page);
  };

  const handleStatus = useCallback(
    (value) => {
      setStatus(value), [];
    },
    [setStatus]
  );

  return (
    <Main>
      <Toolbar>
        <LeftToolbar>
          <Typography
            component={'h1'}
            variant='subHeading1'
            color='text.primary'
            width='fit-content'
            whiteSpace='nowrap'
          >
            Manage Users
          </Typography>
          <InputWrapper>
            <SearchInput
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </InputWrapper>
          <UserFilter status={status} setStatus={handleStatus} />
        </LeftToolbar>
        <ButtonWrapper direction={'row'} justifyContent={'flex-end'}>
          <Button
            variant={'contained'}
            sx={{ padding: '0.4rem 1rem' }}
            onClick={handleOpenUser}
          >
            <Typography
              variant='body2'
              component={'span'}
              whiteSpace={'nowrap'}
            >
              Add New Users
            </Typography>
          </Button>
        </ButtonWrapper>
      </Toolbar>
      <TableWrapper mt={3}>
        <DataTable
          columns={columns}
          rows={data}
          loading={false}
          autoHeight
          disableColumnMenu
          disableColumnFilter
          hideFooter
          hideFooterSelectedRowCount={true}
          rowHeight={50}
          rowSelection={false}
          disableSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 1 ? 'even' : 'odd'
          }
          slots={{
            loadingOverlay: LinearProgress
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
              (sampleData.length || 1) / process.env.NEXT_PUBLIC_LIST_PER_PAGE
            )}
            page={page}
            color='standard'
          />
        </PaginationSection>
      </TableWrapper>
      <UserModal open={openUser} handleClose={handleCloseUser} />
      <DeleteModal
        open={openDelete}
        handleClose={handleClose}
        title={'Delete User'}
        message={
          'Are you sure you want to delete this user? This action cannot be undone.'
        }
        confirm={() => null}
        loading={false}
      />
    </Main>
  );
}

const Main = styled(Stack)(({ theme }) => ({
  width: 'calc(100vw - 300px)',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    padding: '2rem 1rem',
    width: '100%'
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    '& button': {
      width: '100%'
    }
  }
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const ButtonWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& button': {
      width: '100%'
    }
  }
}));
const Chip = styled(Box)(({ theme, color }) => ({
  fontSize: 'inherit',
  padding: `${pxToRem(4.5)} 12px`,
  borderRadius: '20px',
  width: '128px',
  color: theme.palette.primary.main,
  background: `${theme.palette.primaryLight.main}10`,
  textTransform: 'capitalize',
  lineHeight: 1.75,
  [theme.breakpoints.down('sm')]: {
    width: 96
  }
}));
