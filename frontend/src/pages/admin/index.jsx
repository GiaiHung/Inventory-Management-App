import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import Header from '../../components/Helper/Header'
import { useGetAdminQuery } from '../../store/api'
import { adminColumns } from '../../utils/constants'

function Admin() {
  const theme = useTheme()

  const { data, isLoading } = useGetAdminQuery()

  return (
    <Box m="1.5rem">
      <Header title="Admin" subtitle="List of all admins" />
      <Box
        mt="20px"
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
          columns={adminColumns}
          rows={data || []}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  )
}

export default Admin
