// ** Icon Imports
import Icon from '@core/components/icon'
// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

const data = {
  lms: [
    {
      pro: true,
      starter: true,
      enterprise: true,
      feature: 'Quản lý ngân hàng câu hỏi với 8 loại định dạng phổ biến.'
    },
    {
      pro: false,
      starter: false,
      enterprise: true,
      feature: 'Quản lý Lớp học, Học viên.'
    },
    {
      starter: false,
      enterprise: true,
      pro: 'Add-On Available',
      feature: 'Export đề thi với định dạng word'
    },
    {
      pro: true,
      starter: false,
      enterprise: true,
      feature: 'Thống kê, báo cáo kết quả Thi của Học viên trong lớp'
    },
    {
      starter: false,
      enterprise: true,
      pro: 'Add-On Available',
      feature: 'Chấm điểm tự luận'
    },
  ],
  portal: [
    {
      pro: true,
      starter: true,
      enterprise: true,
      feature: 'Quản lý ngân hàng câu hỏi với 7 loại định dạng'
    },
    {
      pro: false,
      starter: false,
      enterprise: true,
      feature: 'Quản lý Lớp học, Học viên'
    },
    {
      pro: true,
      starter: false,
      enterprise: true,
      feature: 'Import Ngân hàng câu hỏi bằng Excel'
    },
    {
      starter: false,
      enterprise: true,
      pro: 'Add-On Available',
      feature: 'Export đề thi với định dạng word'
    },
    {
      pro: true,
      starter: false,
      enterprise: true,
      feature: 'Thống kê, báo cáo kết quả Thi của Học viên trong lớp'
    },
    {
      starter: false,
      enterprise: true,
      pro: 'Add-On Available',
      feature: 'Removal of Front branding'
    },
    {
      pro: false,
      starter: false,
      enterprise: true,
      feature: 'Active maintenance & support'
    },
    {
      pro: false,
      starter: false,
      enterprise: true,
      feature: 'Data storage for 365 days'
    }
  ]
}

const PricingTable = ({ type }) => {
  return (
    <>
      {(type == 'teacher' || type == 'enterprise') && (
        <div>
          <Box sx={{ mb: 12, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 2.5 }}>
              Tính năng của LMS
            </Typography>
            <Typography variant='body2'>Chúng tôi hoàn tiền nếu bạn không hài lòng.</Typography>
          </Box>
          <Box
            sx={{
              mt: 8,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'action.hover' }
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start'
                        }}
                      >
                        <Typography noWrap sx={{ fontSize: '.75rem', fontWeight: 600, letterSpacing: '.17px' }}>
                          Tính năng
                        </Typography>
                        <Typography noWrap sx={{ fontSize: '.75rem', letterSpacing: '.4px', textTransform: 'capitalize' }}>
                          Các tính năng của LMS
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.lms.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.feature}</TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          '& svg': { verticalAlign: 'middle', color: 'primary.main' }
                        }}
                      >
                        <Icon fontSize={20} icon={'mdi:check-circle'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      )}
      {/* {(type == 'student') && (
        <div>
          <Box sx={{ mb: 12, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 2.5 }}>
              Tính năng của Portal
            </Typography>
            <Typography variant='body2'>Stay cool, we have a 48-hour money back guarantee!</Typography>
          </Box>
          <Box
            sx={{
              mt: 8,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'action.hover' }
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start'
                        }}
                      >
                        <Typography noWrap sx={{ fontSize: '.75rem', fontWeight: 600, letterSpacing: '.17px' }}>
                          Tính năng
                        </Typography>
                        <Typography noWrap sx={{ fontSize: '.75rem', letterSpacing: '.4px', textTransform: 'capitalize' }}>
                          Các tính năng của LMS
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.portal.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.feature}</TableCell>
                      <TableCell
                        align='center'
                        sx={{
                          '& svg': { verticalAlign: 'middle', color: 'primary.main' }
                        }}
                      >
                        <Icon fontSize={20} icon={'mdi:check-circle'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      )} */}
    </>
  )
}

export default PricingTable
