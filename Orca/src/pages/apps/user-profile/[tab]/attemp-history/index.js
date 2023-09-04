// ** MUI Components
import Grid from '@mui/material/Grid'

import ExamAttempHistory from './ExamAttempHistory'

const AttempHistoryTab = ({ data }) => {

  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item xl={12} md={12} xs={12}>
        <ExamAttempHistory />
      </Grid>
    </Grid>
  ) : null
}

export default AttempHistoryTab
