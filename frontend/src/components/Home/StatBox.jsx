import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

function StatBox({ title, value, icon, description, increase }) {
  const theme = useTheme()
  return (
    <Box
      gridRow="span 1"
      gridColumn="span 2"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      className={`flex flex-col justify-between rounded-md px-2 py-3`}
    >
      <div className="flex items-center justify-between">
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100], fontWeight: 'bold' }}>
          {title}
        </Typography>
        <span className={`text-yellow-200 text-2xl`}>{icon}</span>
      </div>

      <Typography variant="h4" fontWeight="600" sx={{ color: theme.palette.secondary[200] }}>
        {value}
      </Typography>

      <div className="flex items-center justify-between">
        <Typography variant="h5" sx={{ color: theme.palette.secondary.light }} fontStyle="italic">
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </div>
    </Box>
  )
}

export default StatBox
