import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Helper/Header'
import { useGetPerformanceQuery } from '../../store/api'
import { performanceColumns } from '../../utils/constants'

function Performance() {
  const { _id } = useSelector((state) => state.auth.user)
  const { data, isLoading } = useGetPerformanceQuery(_id)
  const theme = useTheme()

  return <Box m="1.5rem">
      <Header title="Performance" subtitle="See your user performance" />
      <Box
        mt="20px"
        height="80vh"
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
          columns={performanceColumns}
          rows={(data && data.sales) || []}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
}
export default Performance
