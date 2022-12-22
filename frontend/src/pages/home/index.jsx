import React from 'react'
import { useMediaQuery, Box, useTheme, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetDashboardQuery } from '../../store/api'
import Loading from '../../components/Helper/Loading'
import Header from '../../components/Helper/Header'
import { BsCalendarMonthFill, BsDownload } from 'react-icons/bs'
import StatBox from '../../components/Home/StatBox'
import { FaTrafficLight, FaUserAlt } from 'react-icons/fa'
import OverviewChart from '../../components/Chart/OverviewChart'
import { MdPointOfSale } from 'react-icons/md'
import { transactionColumns } from '../../utils/constants'
import CategoryPieChart from '../../components/Chart/CategoryPieChart'

function Home() {
  const isFullscreen = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()
  const theme = useTheme()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  console.log(data)

  return (
    <Box m="1.5rem">
      <div className="flex w-full items-center justify-between">
        <Header title="Dashboard" subtitle="Overview your business" />
        <button
          className={`flex items-center gap-x-2 text-lg font-semibold bg-${theme.palette.secondary.light} text-${theme.palette.background.alt} px-3 py-2 hover:bg-gray-500/10`}
        >
          <BsDownload />
          <span>Download report</span>
        </button>
      </div>

      {/* Row 1 */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        gridAutoRows="170px"
        sx={{ '& > div': { gridColumn: isFullscreen ? undefined : 'span 12' } }}
      >
        <StatBox
          title="Total customers"
          value={data && data.totalCustomers}
          increase="14%"
          description="Since last month"
          icon={<FaUserAlt />}
        />
        <StatBox
          title="Annual sales"
          value={data && data.yearlySalesTotal}
          increase="35%"
          description="Since last week"
          icon={<MdPointOfSale />}
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>

        <StatBox
          title="Total monthly sales"
          value={data && data.thisMonthStat.totalSales}
          increase="8%"
          description="Since last month"
          icon={<BsCalendarMonthFill />}
        />
        <StatBox
          title="Total today sales"
          value={data && data.todayStat.totalSales}
          increase="11%"
          description="Since yesterday"
          icon={<FaTrafficLight />}
        />

        {/* Row 2 */}
        <Box
          mt="20px"
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem',
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
              backgroundColor: theme.palette.background.alt,
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
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={transactionColumns}
          />
        </Box>
        <Box
          mt="20px"
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <CategoryPieChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
            Breakdown of real states and information via category for revenue made for this year and
            total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
