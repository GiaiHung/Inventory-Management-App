import React from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material'
import Header from '../../components/Helper/Header'
import { useState } from 'react'
import OverviewChart from '../../components/Chart/OverviewChart'

function Overview() {
  const [view, setView] = useState('units')
  return (
    <Box m="1.5rem">
      <Header title="OVERVIEW" subtitle="View your annual sales and units" />
      <Box height="80vh">
        <FormControl sx={{ mt: '1rem' }}>
          <InputLabel>View</InputLabel>
          <Select label="view" value={view} onChange={(e) => setView(e.target.value)}>
            <MenuItem value="units">Units</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  )
}

export default Overview
