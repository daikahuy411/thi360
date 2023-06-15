// ** Demo Components Imports
import CardStatisticsVertical from '@core/components/card-statistics/card-stats-vertical'
// ** Icon Imports
import Icon from '@core/components/icon'
// ** MUI Import
import Grid from '@mui/material/Grid'

const CardStatsVertical = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} sm={4} lg={2} key={index}>
              <CardStatisticsVertical {...item} icon={<Icon icon={item.icon} />} />
            </Grid>
          )
        })}
      </Grid>
    )
  } else {
    return null
  }
}

export default CardStatsVertical
