import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'
import NavLink from 'next/link'
import { useRouter } from 'next/router'

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Program = () => {
  const router = useRouter()
  const { programId } = router.query
  const [program, setProgram] = useState(null);

  useEffect(() => {
    if (!programId || programId == 0) {
      return
    }
    new V1Api().getProgramCatalog(programId).then(response => {
      setProgram(response.data)
    })
  }, [programId])

  return <>
    <Grid
      container
      spacing={2}
    >
      {program && (
        <>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" component={NavLink} href="/">
                Home
              </Link>
              <Typography color="text.primary">{program.name}</Typography>
            </Breadcrumbs>
            <br />
          </Grid>
          {program.subjectCatalogs.map((item) => (
            <Grid item md={2} key={item.id}>
              <Card variant="outlined" style={{ minHeight: 88 }} >
                <CardContent>
                  <Typography
                    component={NavLink} href={`/program/${programId}/subject/${item.oldId}`}
                    sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  </>
}

export default Program

