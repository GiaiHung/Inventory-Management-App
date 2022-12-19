import React, { useState, useMemo } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Helper/Header'
import CategoryPieChart from '../../components/Chart/CategoryPieChart'

function Breakdown() {
  return (
    <Box m="1.5rem">
      <Header title="CATEGORY OVERVIEW" subtitle="View your goods sold with pie chart" />
      <Box height="80vh" mt="10px">
        <CategoryPieChart />
      </Box>
    </Box>
  )
}

export default Breakdown
