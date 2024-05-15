'use client';
import DeleteLogo from '@/assets/CustomIcons/DeleteLogo';
import EditIcon from '@/assets/CustomIcons/EditIconFilled';
import SearchIcon from '@/assets/CustomIcons/SearchIcon';
import Button from '@/components/core/Button';
import { DataTable, TableWrapper } from '@/components/core/DataTable';
import CategoryModal from '@/components/core/modals/CategoryModal';
import DeleteModal from '@/components/core/modals/DeleteModal';
import OutlinedInput from '@/components/core/OutlinedInput';
import ChangeStatus from '@/components/dashboard/ChangeStatus';
import { PaginationSection } from '@/components/styled/core';
import { useDebounce } from '@/hooks/custom';
import {
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory
} from '@/hooks/promptstudio';
import {
  Box,
  IconButton,
  LinearProgress,
  Pagination,
  Stack,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { useCallback, useState } from 'react';
import ButtonWrapper from './components/ButtonWrapper';
import NoResultFound from './NoResultFound';
const categories = [
  {
    id: 1,
    name: 'Foundation models',
    models: 5,
    status: 1
  }
];

export default function Categories() {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const search_query = useDebounce(search, 600);

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setOpenDelete(false);
  };

  const { data, isLoading } = useGetCategories({ search_query, page });

  const { mutate: mutateStatus, isLoading: updateLoading } = useUpdateCategory(
    () => null
  );

  const { mutate: deleteCategory, isLoading: deleteLoading } =
    useDeleteCategory({ callback: handleClose, search_query, page });

  const changeStatus = useCallback(
    (data) => {
      setSelected(data);

      mutateStatus({ category_id: data.id, is_active: data.status === 1 });
    },
    [mutateStatus]
  );
  const handlePageChange = (e, page) => {
    setPage(() => page);
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Category Name',
      flex: 1,
      minWidth: 200,
      valueGetter: ({ row }) => row?.title || '-- --'
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 160,
      renderCell: ({ row }) => (
        <ChangeStatus
          {...row}
          status={row.is_active ? 1 : 2}
          changeStatus={changeStatus}
          isLoading={updateLoading && row.id === selected?.id}
          selectedId={selected?.id}
        />
      )
    },
    {
      field: 'Action',
      headerName: 'Action',
      headerAlign: 'start',
      minWidth: 130,
      renderCell: ({ row }) => {
        return (
          <Stack direction={'row'} gap={'1rem'}>
            <IconWrapper
              color={'primary'}
              sx={{ background: theme.palette.primary.main + '10' }}
              onClick={() => {
                setOpen(true);
                setSelected(row);
              }}
            >
              <EditIcon color={theme.palette.primary.main} />
            </IconWrapper>

            <IconWrapper
              color={'error'}
              sx={{ background: theme.palette.error.main + '10' }}
              onClick={() => {
                setOpenDelete(true);
                setSelected(row);
              }}
            >
              <DeleteLogo />
            </IconWrapper>
          </Stack>
        );
      }
    }
  ];

  const handleDeleteConfirm = useCallback(() => {
    deleteCategory(selected.id);
  }, [deleteCategory, selected?.id]);

  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false);
  }, []);
  return (
    <Stack>
      <Toolbar>
        <Typography
          component={'h1'}
          variant='subHeading1'
          color={'text.primary'}
          // sx={{ whiteSpace: 'nowrap' }}
          minWidth={90}
          noWrap
        >
          Categories
        </Typography>
        <InputWrapper>
          <OutlinedInput
            placeholder={'Search'}
            startAdornment={<SearchIcon />}
            onChange={(e) => setSearch(e.target.value)}
            inputStyle={{
              height: '31px',
              borderRadius: '10px',
              padding: '0 .5rem',
              '&.MuiInputBase-root': {
                border: `1px solid ${theme.palette.divider}40`,
                background: `${theme.palette.background.paper}40`
              },
              '& ::placeholder': {
                color: theme.palette.background.paper
              },
              '& input': {
                padding: '.3rem 1rem',
                width: '100%'
              }
            }}
          />
        </InputWrapper>
        <ButtonWrapper alignItems='flex-end' flex={1}>
          <Button
            onClick={() => setOpen(true)}
            variant='contained'
            sx={{
              padding: '0.5rem 2rem',
              whiteSpace: 'nowrap',
              height: '31px'
            }}
          >
            <Typography variant='body1'>Add Category</Typography>
          </Button>
        </ButtonWrapper>
      </Toolbar>
      <TableWrapper mt={3}>
        {!!data?.results?.length || isLoading ? (
          <>
            <DataTable
              rows={data?.results || []}
              columns={columns}
              loading={isLoading}
              disableColumnMenu
              disableColumnFilter
              hideFooter
              hideFooterSelectedRowCount={true}
              rowHeight={50}
              autoHeight
              disableSelectionOnClick
              rowSelection={false}
              slots={{
                loadingOverlay: () => <LinearProgress color='primary' />
              }}
            />
            <PaginationSection>
              <PaginationSection>
                <Pagination
                  variant='outlined'
                  shape='rounded'
                  onChange={handlePageChange}
                  count={Math.ceil(
                    (data?.total_count || 1) /
                      (process.env.NEXT_PUBLIC_LIST_PER_PAGE || 15)
                  )}
                  page={page}
                  color='secondary'
                  siblingCount={0}
                  boundaryCount={1}
                />
              </PaginationSection>
            </PaginationSection>
          </>
        ) : (
          <NoResultFound />
        )}
      </TableWrapper>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        selected={selected}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        title={'Delete Category'}
        message={'Are you sure you want to delete this category?'}
        confirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </Stack>
  );
}

const IconWrapper = styled(IconButton)(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '15px',
  display: 'grid',
  placeItems: 'center'
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
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
