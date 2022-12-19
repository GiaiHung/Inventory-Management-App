import React, { useState, useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { Box, useTheme } from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Header from '../../components/Helper/Header'
import { useGetSalesQuery } from '../../store/api'
import Loading from '../../components/Helper/Loading'

function Daily() {
  // make sure it is in 2021
  const [startDate, setStartDate] = useState(new Date('2021-02-01'))
  const [endDate, setEndDate] = useState(new Date('2021-03-01'))
  const { data } = useGetSalesQuery()
  const theme = useTheme()

  const [formattedData] = useMemo(() => {
    if (!data) return []

    const { dailyData } = data
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

    dailyData.forEach(({date, totalSales, totalUnits}) => {
      const dateFormatted = new Date(date)
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf('-') + 1) // 02-01, 03-01,...
        totalSalesLine.data = [...totalSalesLine.data, { x: splitDate, y: totalSales }]
        totalUnitsLine.data = [...totalUnitsLine.data, { x: splitDate, y: totalUnits }]
      }
    })

    const formattedData = [totalSalesLine, totalUnitsLine]

    return [formattedData]
  }, [data, startDate, endDate])

  console.log(formattedData)

  return (
    <Box m="1.5rem">
      <Header title="DAILY SALES" subtitle="View your daily sales in certain periods" />
      <Box height="80vh">
        <Box className="my-3 ml-auto flex max-w-[400px] items-center gap-x-3 text-black md:max-w-[600px]">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full p-2 text-center"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full p-2 text-center"
          />
        </Box>

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
            curve="catmullRom"
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Daily',
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

export default Daily
