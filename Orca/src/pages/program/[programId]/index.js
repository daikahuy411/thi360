import * as React from 'react'
import { useEffect, useState } from 'react'
import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import { useRouter } from 'next/router'
import Icon from '@core/components/icon'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const Program = () => {
  const router = useRouter()
  const { programId } = router.query
  const [program, setProgram] = useState(null)

  useEffect(() => {
    if (!programId || programId == 0) {
      return
    }
    new V1Api().getProgramCatalog(programId).then(response => {
      setProgram(response.data)
    })
  }, [programId])

  return (
    <>
      <Grid container spacing={2}>
        {program && (
          <>
            <Grid item xs={12}>
              <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' component={NavLink} href='/'>
                  Home
                </Link>
                <Typography color='text.primary'>{program.name}</Typography>
              </Breadcrumbs>
              <br />
            </Grid>
            {program.subjectCatalogs.map(item => (
              <Grid item md={6} key={item.id}>
                <Card variant='outlined' style={{ minHeight: 88, padding: 10 }}>
                  <CardContent
                    sx={{ textDecoration: 'none' }}
                    component={NavLink}
                    href={`/program/${programId}/subject/${item.oldId}`}
                  >
                    <br />
                    <Typography
                      component={NavLink}
                      href={`/program/${programId}/subject/${item.oldId}`}
                      sx={{ fontSize: 14, color: '#1a2c47', fontWeight: 'bold', textDecoration: 'none' }}
                      color='text.secondary'
                      gutterBottom
                    >
                      {item.name}
                    </Typography>
                    <br />
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <StyledBox>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              '& svg': { color: 'primary.secondary', mr: 2.75 }
                            }}
                          >
                            <Icon icon='mdi:circle-small' fontSize={20} />
                            <Typography variant='body2'>{item.totalExam} kỳ thi</Typography>
                          </Box>
                        </StyledBox>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { color: 'primary.secondary', mr: 2.75 }
                          }}
                        >
                          <Icon icon='mdi:circle-small' fontSize={20} />
                          <Typography variant='body2'>{item.totalTest} đề thi</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  )
}

export default Program
