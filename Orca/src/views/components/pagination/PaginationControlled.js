// ** React Imports
import { useState } from 'react'

import Pagination from '@mui/material/Pagination'
// ** MUI Imports
import Typography from '@mui/material/Typography'

const PaginationControlled = () => {
  // ** State
  const [page, setPage] = useState(0)

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <div>
      <Typography sx={{ mb: 2 }}>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
    </div>
  )
}

export default PaginationControlled
