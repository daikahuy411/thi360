// ** Custom Components Imports
import CardStatisticsHorizontal from '@core/components/card-statistics/card-stats-horizontal'
// ** Icon Imports
import Icon from '@core/components/icon'
// ** MUI Import
import Grid from '@mui/material/Grid'

const CardStatsHorizontal = ({ data }) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item, index) => {
          return (
            <Grid item xs={12} md={3} sm={6} key={index}>
              <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon} />} />
            </Grid>
          )
        })}
      </Grid>
    )
  } else {
    return null
  }
}

export default CardStatsHorizontal
