// ** Icon Imports
import Icon from '@core/components/icon'
// ** Custom Components Imports
import CustomAvatar from '@core/components/mui/avatar'
import OptionsMenu from '@core/components/option-menu'
import ReactApexcharts from '@core/components/react-apexcharts'
// ** Util Import
import { hexToRGBA } from '@core/utils/hex-to-rgba'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const CardWidgetsWeeklySales = () => {
  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      show: false,
      padding: {
        top: -15,
        left: -10,
        right: -10
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1),
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.1),
      hexToRGBA(theme.palette.primary.main, 0.1)
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          fontSize: '12px',
          colors: theme.palette.text.disabled
        }
      }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Sales'
        subheader='Total 85.4k Sales'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
      />
      <CardContent sx={{ pb: `${theme.spacing(7)} !important` }}>
        <ReactApexcharts type='bar' height={203} series={[{ data: [40, 60, 50, 60, 90, 40, 50] }]} options={options} />
        <Box sx={{ mt: 6.25, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              sx={{ mr: 4, width: 42, height: 42, '& svg': { color: 'primary.main' } }}
            >
              <Icon icon='mdi:trending-up' fontSize='1.875rem' />
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>34.6k</Typography>
              <Typography variant='body2' sx={{ lineHeight: '1.313rem', letterSpacing: '0.25px' }}>
                Sales
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin='light'
              color='success'
              variant='rounded'
              sx={{ mr: 4, width: 42, height: 42, '& svg': { color: 'success.main' } }}
            >
              <Icon icon='mdi:currency-usd' fontSize='1.875rem' />
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>$482k</Typography>
              <Typography variant='body2' sx={{ lineHeight: '1.313rem', letterSpacing: '0.25px' }}>
                Total Profit
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardWidgetsWeeklySales
