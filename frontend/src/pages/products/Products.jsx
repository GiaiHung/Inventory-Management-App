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
import {useGetProductsQuery} from '../../store/api'

function Products() {
    const {data, loading} = useGetProductsQuery()
  return (
    <Box>
        <Header title="Products" subtitle="See your list of products"/>
    </Box>
  )
}

export default Products