import * as React from 'react'
import { useEffect } from 'react'

import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import Icon from '@core/components/icon'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const ProgamPage = () => {
  const [programs, setPrograms] = React.useState([]);

  useEffect(() => {
    new V1Api().getProgramCatalogs().then(response => {
      setPrograms(response.data)
    })
  }, [])

  return <>
    <br />
    <Grid container spacing={8}>
      {programs.map((item) => (
        <Grid item md={6} key={item.id}>
          <Card variant="outlined" style={{ minHeight: 88, padding: 10 }}>
            <CardContent
              sx={{ p: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important`, textDecoration: 'none' }} component={NavLink} href={`/program/${item.id}`}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Typography
                    component={NavLink} href={`/program/${item.id}`}
                    sx={{ fontSize: 16, color: '#1a2c47', fontWeight: 'bold', textDecoration: 'none', marginBottom: 10 }} color="text.secondary" gutterBottom>
                    {item.name}
                  </Typography>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <StyledBox>
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary.secondary', mr: 2.75 } }}>
                      <Icon icon='mdi:circle-small' fontSize={20} />
                      <Typography variant='body2'>{item.totalSubject} Môn</Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <StyledBox>
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary.secondary', mr: 2.75 } }}>
                      <Icon icon='mdi:circle-small' fontSize={20} />
                      <Typography variant='body2'>{item.totalExam} kỳ thi</Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary.secondary', mr: 2.75 } }}>
                    <Icon icon='mdi:circle-small' fontSize={20} />
                    <Typography variant='body2'>{item.totalTest} đề thi</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
}

export default ProgamPage

