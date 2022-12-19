import React, { useState, useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Box, useTheme } from '@mui/material'
import Header from '../../components/Helper/Header'
import { useGetSalesQuery } from '../../store/api'
import Loading from '../../components/Helper/Loading'

function Monthly() {
  const { data } = useGetSalesQuery()
  const theme = useTheme()

  const [formattedData] = useMemo(() => {
    if (!data) return []

    const { monthlyData } = data
    const totalSalesLine = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [],
    }
    const totalUnitsLine = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [],
    }

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      const monthFormatted = month.slice(0, 3)
      totalSalesLine.data = [...totalSalesLine.data, { x: monthFormatted, y: totalSales }]
      totalUnitsLine.data = [...totalUnitsLine.data, { x: monthFormatted, y: totalUnits }]
    })

    const formattedData = [totalSalesLine, totalUnitsLine]

    return [formattedData]
  }, [data])

  return (
    <Box m="1.5rem">
      <Header title="MONTHLY SALES" subtitle="View your monthly sales in certain periods" />
      <Box height="80vh">
        {data ? (
          <ResponsiveLine
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
            margin={{ top: 20, right: 80, bottom: 50, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            colors={{ datum: 'color' }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Monthly',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total sales daily',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: 20,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loading />
          </div>
        )}
      </Box>
    </Box>
  )
}

export default Monthly
