/* eslint-disable react/prop-types */

import { Pagination } from "@mui/material"

const Paginate = ({
  count,
  page,
  onPageChange
  }) => {
  

  return (
    count > 1 && (
      <Pagination
      count={count} // Total number of pages
      page={page} // Current page number (starts from 1)
      onChange={onPageChange} // Function to handle page change
       // Optional, set color theme (default, primary, secondary)
      variant="outlined" // Optional, set variant (outlined, text)
      showFirstButton={true} // Optional, show first and last page buttons
      showLastButton={true} // Optional, show first and last page buttons
    />
    )
  )
}
export default Paginate