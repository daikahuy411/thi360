import * as React from 'react'
import { useEffect } from 'react'

import V1Api from 'api/v1-api'
import NavLink from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const ProgamPage = () => {
  const [programs, setPrograms] = React.useState([]);

  useEffect(() => {
    new V1Api().getProgramCatalogs().then(response => {
      setPrograms(response.data)
    })
  }, [])

  return <>
    <Grid container spacing={2}>
      {programs.map((item) => (
        <Grid item md={2} key={item.id}>
          <Card variant="outlined" style={{ minHeight: 88 }}>
            <CardContent>
              <Typography
                component={NavLink} href={`/program/${item.id}`}
                sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {item.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
}

export default ProgamPage

