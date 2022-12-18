import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import Header from '../../components/Helper/Header'
import { useGetCustomersQuery } from '../../store/api'
import { customerColumns } from '../../utils/constants'

function Customers() {
  const { data, isLoading } = useGetCustomersQuery()
  const theme = useTheme()

  return (
    <Box m="1.5rem">
      <Header title="Customers" subtitle="List of all customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          columns={customerColumns}
          rows={data || []}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  )
}

export default Customers
