import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
} from '@mui/material'

function Product({ product }) {
  const [expanded, setExpanded] = useState(false)
  const { _id, name, description, price, rating, category, supply, stat } = product
  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
          {category.toUpperCase()}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: '.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="primary" size="small" onClick={() => setExpanded(!expanded)}>
          Show more
        </Button>
      </CardActions>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>Supply in warehouse: {supply}</Typography>
          <Typography>Annual sales: {stat[0].yearlySalesTotal}</Typography>
          <Typography>Annual units sold: {stat[0].yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Product
