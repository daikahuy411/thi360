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
import IconToan from '../../../../public/images/img-monhoc/mon-toan.svg'
import IconLy from '../../../../public/images/img-monhoc/mon-vatly.svg'
import IconHoa from '../../../../public/images/img-monhoc/mon-hoa.svg'
import IconVan from '../../../../public/images/img-monhoc/mon-nguvan.svg'
import IconSu from '../../../../public/images/img-monhoc/mon-lichsu.svg'
import IconTienAnh from '../../../../public/images/img-monhoc/mon-tienganh.svg'
import IconCongNghe from '../../../../public/images/img-monhoc/mon-congnghe.svg'
import IconTinHoc from '../../../../public/images/img-monhoc/mon-tinhoc.svg'
import IconSinhHoc from '../../../../public/images/img-monhoc/mon-sinhhoc.svg'
import IconGDCD from '../../../../public/images/img-monhoc/mon-gdcd.svg'
import IconDiaLy from '../../../../public/images/img-monhoc/mon-dia.svg'
// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
const convertSubjectImgById = id => {
  switch (id) {
    case 1:
      return <Image style={{ marginRight: 10 }} src={IconToan}></Image>
      break
    case 2:
      return <Image style={{ marginRight: 10 }} src={IconLy}></Image>
      break
    case 3:
      return <Image style={{ marginRight: 10 }} src={IconHoa}></Image>
      break
    case 4:
      return <Image style={{ marginRight: 10 }} src={IconVan}></Image>
      break
    case 5:
      return <Image style={{ marginRight: 10 }} src={IconSu}></Image>
      break
    case 6:
      return <Image style={{ marginRight: 10 }} src={IconTienAnh}></Image>
      break
    case 7:
      return <Image style={{ marginRight: 10 }} src={IconCongNghe}></Image>
      break
    case 8:
      return <Image style={{ marginRight: 10 }} src={IconTinHoc}></Image>
      break
    case 9:
      return <Image style={{ marginRight: 10 }} src={IconSinhHoc}></Image>
      break
    case 10:
      return <Image style={{ marginRight: 10 }} src={IconGDCD}></Image>
      break
    case 11:
      return <Image style={{ marginRight: 10 }} src={IconDiaLy}></Image>
      break
    default:
      return <Image style={{ marginRight: 10 }} src={IconTienAnh}></Image>

      break
  }
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
            {/* Đường dẫn tới trang */}
            <Grid item xs={12}>
              <Breadcrumbs aria-label='breadcrumb'>
                <Link underline='hover' color='inherit' component={NavLink} href='/'>
                  {/* Home */}
                  <Icon icon='mdi-light:home'></Icon>
                </Link>
                <Typography color='#9B51E0'>{program.name}</Typography>
              </Breadcrumbs>
              {/* <br /> */}
            </Grid>
            {/* Danh sách môn học */}
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
                        {convertSubjectImgById(item?.oldId)}
                        {/* <br /> */}
                      </Grid>

                      <Grid item container xs={9} sm={9} md={9}>
                        <Typography
                          component={NavLink}
                          href={`/program/${programId}/subject/${item.oldId}`}
                          sx={{
                            // fontFamily: 'BeVietnamPro-SemiBold',
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
                            fontFamily: 'Be Vietnam Pro',
                            fontWeight: 600,
                            lineHeight: '24px',
                            letterSpacing: '0em',
                            textAlign: 'left'
                          }}
                          // color='text.secondary'
                          // gutterBottom
                        >
                          {item.name}
                        </Typography>
                        {/* <br /> */}

                        <Grid container spacing={25}>
                          <Grid item xs={6} sm={6} md={6}>
                            {/* Kì thi */}
                            {/* <StyledBox> */}
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
                                  fontFamily: 'BeVietnamPro-SemiBold',
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
                            {/* </StyledBox> */}
                          </Grid>
                          <Grid item xs={6} sm={6} md={6}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'end'
                                // '& svg': { color: 'primary.secondary', mr: 2.75 }
                              }}
                            >
                              <Image src={IconDeThi} width={20} height={20}></Image>
                              <Typography
                                sx={{
                                  fontFamily: 'BeVietnamPro-SemiBold',
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
