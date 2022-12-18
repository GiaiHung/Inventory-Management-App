import React from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import Header from '../../components/Helper/Header'
import Loading from '../../components/Helper/Loading'
import { useGetProductsQuery } from '../../store/api'
import Product from './Product'

function Products() {
  const { data } = useGetProductsQuery()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')

  return (
    <Box m="1.5rem">
      <Header title="Products" subtitle="See your list of products" />
      {data ? (
        <Box
          display="grid"
          mt="20px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="10px"
          sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}
        >
          {data.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </Box>
      ) : (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      )}
    </Box>
  )
}

export default Products
