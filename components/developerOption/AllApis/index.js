'use client';
import DeleteLogo from '@/assets/CustomIcons/DeleteLogo';
import { DataTable, TableWrapper } from '@/components/core/DataTable';
import SearchInput from '@/components/core/SearchInput';
import { PaginationSection } from '@/components/styled/core';
import { useDebounce } from '@/hooks/custom';
import {
  useDeleteDeveloperOption,
  useGetCompanyDeveloperOption
} from '@/hooks/developerOption';
import {
  Box,
  IconButton,
  LinearProgress,
  Pagination,
  Stack,
  Typography,
  styled
} from '@mui/material';
import { useCallback, useState } from 'react';
import DeleteModal from '../../core/modals/DeleteModal';
import ChangeApiStatus from '../ChangeApiStatus';
import RegenerateBtn from './RegenerateBtn';

export default function AllApis() {
  const columns = [
    {
      field: 'api_name',
      headerName: 'API Name',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'api_key',
      headerName: 'API Key',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'user__full_name',
      headerName: 'User Name',
      minWidth: 160
    },
    {
      field: 'api_status',
      headerName: 'Status',
      minWidth: 160,
      renderCell: ({ row }) => <ChangeApiStatus {...row} />
    },
    {
      field: 'Action',
      headerName: 'Action',
      flex: 0.3,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Stack direction={'row'} gap={'0px'}>
          <RegenerateBtn user={row.user} />
          <IconButton
            color='error'
            sx={{ visibility: row.role === 1 && 'hidden' }}
            onClick={() => {
              setSelected(row);
              setOpenDelete(true);
            }}
          >
            <DeleteLogo />
          </IconButton>
        </Stack>
      )
    }
  ];

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const searchString = useDebounce(search, 600);

  const handleClose = useCallback(() => {
    setOpenDelete(false);
  }, []);

  const { mutate: deleteApi, isLoading: deleteLoading } =
    useDeleteDeveloperOption(handleClose);

  const { data, isLoading } = useGetCompanyDeveloperOption({
    page,
    search: searchString
  });

  const handlePageChange = (e, page) => {
    setPage(() => page);
  };

  const handleDelete = useCallback(() => {
    deleteApi({
      target_users: [selected?.user]
    });
  }, [selected, deleteApi]);

  return (
    <Main>
      <Toolbar>
        <LeftToolbar>
          <Typography
            component={'h1'}
            variant='subHeading1'
            color={'text.primary'}
            width={'fit-content'}
          >
            User API Keys
          </Typography>
          <InputWrapper>
            <SearchInput
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </InputWrapper>
        </LeftToolbar>
      </Toolbar>
      <TableWrapper mt={3}>
        <DataTable
          columns={columns}
          rows={!!data?.result?.length ? data?.result : []}
          loading={isLoading}
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
          getRowId={(row) => row.user}
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
              (data?.total_count || 1) / process.env.NEXT_PUBLIC_LIST_PER_PAGE
            )}
            page={page}
            color='standard'
          />
        </PaginationSection>
      </TableWrapper>
      <DeleteModal
        open={openDelete}
        handleClose={handleClose}
        title={'Delete API Key'}
        message={
          "Are you sure you want to delete this user's API key? This action cannot be undone."
        }
        confirm={handleDelete}
        loading={deleteLoading}
      />
    </Main>
  );
}

const Main = styled(Stack)(() => ({
  // width: 'calc(100vw - 300px)',
  // width: 'inherit'
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
    width: '100%'
  }
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));
