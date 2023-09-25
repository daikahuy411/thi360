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
import Image from 'next/image'
import IconKyThi from '../../../../public/images/icon-kythi.svg'
import IconDeThi from '../../../../public/images/icon-dethi.svg'

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const catalogImages = {
  "7": "/themes/default/assets/img/img-monhoc/mon-congnghe.svg",
  "11": "/themes/default/assets/img/img-monhoc/mon-dia.svg",
  "10": "/themes/default/assets/img/img-monhoc/mon-gdcd.svg",
  "3": "/themes/default/assets/img/img-monhoc/mon-hoa.svg",
  "5": "/themes/default/assets/img/img-monhoc/mon-lichsu.svg",
  "4": "/themes/default/assets/img/img-monhoc/mon-nguvan.svg",
  "9": "/themes/default/assets/img/img-monhoc/mon-sinhhoc.svg",
  "6": "/themes/default/assets/img/img-monhoc/mon-tienganh.svg",
  "8": "/themes/default/assets/img/img-monhoc/mon-tinhoc.svg",
  "1": "/themes/default/assets/img/img-monhoc/mon-toan.svg",
  "2": "/themes/default/assets/img/img-monhoc/mon-vatly.svg",
  "77": "/themes/default/assets/img/img-monhoc/mon-tienganh.svg",
  "78": "/themes/default/assets/img/img-monhoc/mon-tienganh.svg",
  "79": "/themes/default/assets/img/img-monhoc/mon-tienganh.svg",
}

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
                  <Icon icon='mdi-light:home'></Icon>
                </Link>
                <Typography color='#9B51E0'>{program.name}</Typography>
              </Breadcrumbs>
              <br />
            </Grid>
            {program.subjectCatalogs.map(item => (
              <Grid item md={4} xs={12} sm={6} key={item.id}>
                <Card
                  variant='outlined'
                  style={{ minHeight: 70, padding: '15px 5px', display: 'flex', borderRadius: 12 }}
                >
                  <CardContent
                    sx={{ textDecoration: 'none', width: '100%', display: 'inline-block', padding: '0px !important' }}
                    component={NavLink}
                    href={`/program/${programId}/subject/${item.oldId}`}
                  >
                    <Grid container sx={6} md={12}>
                      <Grid item container xs={3} sm={3} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ marginRight: 10 }} alt={item.name} src={catalogImages[item.oldId.toString()]} />
                      </Grid>
                      <Grid item container xs={9} sm={9} md={9}>
                        <Typography
                          component={NavLink}
                          href={`/program/${programId}/subject/${item.oldId}`}
                          sx={{
                            color: ':#333',
                            fontSize: '16px',
                            marginBottom: '0',
                            display: 'inline-block',
                            width: '100%',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontWeight: 600,
                            lineHeight: '24px',
                            letterSpacing: '0em',
                            textAlign: 'left'
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Grid container spacing={25}>
                          <Grid item xs={6} sm={6} md={6}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& svg': { color: 'primary.secondary', mr: 2 }
                              }}
                            >
                              <Image src={IconKyThi} width={20} height={20}></Image>
                              <Typography
                                sx={{
                                  color: '#333',
                                  fontSize: '16px',
                                  marginBottom: '0',
                                  display: 'inline-block',
                                  width: '100%',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  cursor: 'pointer'
                                }}
                                variant='body2'
                              >
                                {item.totalExam} kỳ thi
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'end'
                              }}
                            >
                              <Image src={IconDeThi} width={20} height={20}></Image>
                              <Typography
                                sx={{
                                  color: '#333',
                                  fontSize: '16px',
                                  marginBottom: '0',
                                  display: 'inline-block',
                                  width: '100%',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  cursor: 'pointer'
                                }}
                                variant='body2'
                              >
                                {item.totalTest} đề thi
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
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
