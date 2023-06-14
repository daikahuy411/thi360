// ** Data Imports
import componentData from '@fake-db/components/data'
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const Misc = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='More Components' />
          <CardContent>
            <Alert severity='info' sx={{ mb: 4 }}>
              We have themed each of the MUI components but we have skipped the demos of the following components. User
              can always copy component's code and use from links given below.
            </Alert>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Components</TableCell>
                    <TableCell>Links</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {componentData.map((data, index) => (
                    <TableRow key={index} sx={{ '&:last-of-type .MuiTableCell-root ': { border: 0 } }}>
                      <TableCell>{data.component}</TableCell>
                      <TableCell>
                        <Link href={data.link} target='_blank'>
                          {data.link}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Misc
