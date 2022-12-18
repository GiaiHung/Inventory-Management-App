import React from 'react'
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { AiOutlineSearch } from 'react-icons/ai'

function GridCustomToolbar({ searchInput, setSearchInput, setSearch }) {
  return (
    <GridToolbarContainer>
      <div className="flex w-full items-center justify-between">
        <div classname="flex justify-between gap-x-10">
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
        <TextField
          label="Search..."
          sx={{ mb: '1rem' }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput)
                    setSearchInput('')
                  }}
                >
                  <AiOutlineSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </GridToolbarContainer>
  )
}

export default GridCustomToolbar
