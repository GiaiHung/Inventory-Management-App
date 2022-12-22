import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { useGetSalesQuery } from '../../store/api'
import Loading from '../Helper/Loading'

function CategoryPieChart({ isDashboard = false }) {
  const theme = useTheme()
  const { data, isLoading } = useGetSalesQuery()

  const colors = [
    theme.palette.secondary[200],
    theme.palette.secondary[400],
    theme.palette.secondary[600],
    theme.palette.secondary[700],
  ]

  if (isLoading && !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  const formattedData = Object.entries(data.salesByCategory).map(([category, sales], index) => {
    return {
      id: category,
      label: category,
      value: sales,
      color: colors[index],
    }
  })

  return (
    <Box
      height={isDashboard ? '400px' : '100%'}
      width={undefined}
      minHeight={isDashboard ? '325px' : undefined}
      minWidth={isDashboard ? '325px' : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={theme.palette.secondary[200]}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={theme.palette.secondary[900]}
        enableArcLinkLabels={!isDashboard}
        enableArcLabels={true}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: isDashboard ? 10 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        left="50%"
        top="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{ transform: !isDashboard ? 'translate(-50%, -100%)' : 'translate(-75%, -170%)' }}
      >
        <Typography variant="h6">{!isDashboard && `Total: $${data.yearlySalesTotal}`}</Typography>
      </Box>
    </Box>
  )
}

export default CategoryPieChart
