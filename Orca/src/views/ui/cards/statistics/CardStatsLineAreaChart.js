// ** Custom Components Imports
import ReactApexcharts from '@core/components/react-apexcharts'
// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const series = [
  {
    name: 'Subscribers',
    data: [28, 40, 36, 52, 38, 60, 55]
  }
]

const CardStatsLineAreaChart = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: 'smooth',
      lineCap: 'round'
    },
    grid: {
      show: false,
      padding: {
        left: 2,
        top: -30,
        right: 2
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.3,
              color: theme.palette.success.main
            },
            {
              offset: 100,
              opacity: 0.1,
              color: theme.palette.background.paper
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.success.main
      }
    },
    xaxis: {
      type: 'numeric',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>42.5k</Typography>
        <ReactApexcharts type='area' height={116} options={options} series={series} />
        <Typography variant='body2' sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}>
          Total Growth
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsLineAreaChart
