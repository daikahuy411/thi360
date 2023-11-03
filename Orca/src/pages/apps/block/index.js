import Grid from '@mui/material/Grid'
import TopNav from './_layout/_breadcrums'
import BlockDataTable from './_list'

const PostManage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <TopNav />
        <BlockDataTable />
      </Grid>
    </Grid>
  )
}

export default PostManage
