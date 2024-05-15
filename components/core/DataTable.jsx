import { Box, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const DataTable = styled(DataGrid)(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.divider}50`,
  '&:focus': {
    outline: 'none'
  },
  '&.MuiDataGrid-root': {
    border: 'none',
    minHeight: '400px'
  },
  '& .MuiDataGrid-columnSeparator, .MuiDataGrid-iconButtonContainer': {
    display: 'none'
  },
  '& .MuiDataGrid-columnHeader--moving': {
    background: theme.palette.background.paper
  },
  '& .MuiDataGrid-columnHeaders': {
    background: theme.palette.background.paper,
    borderBottom: 'none',
    borderRadius: '8px',
    ...theme.typography.body1
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `0.1rem solid ${theme.palette.text.secondary}50`,
    ...theme.typography.body2
  },
  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within':
    {
      outline: 'none'
    }
}));
export const TableWrapper = styled(Box)(({ theme }) => ({
  marginTop: '2rem',
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}30`,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    padding: '1rem'
  },
  [theme.breakpoints.down('smm')]: {
    padding: '14px'
  }
}));
