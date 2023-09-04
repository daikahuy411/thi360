import * as React from 'react'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import V1Api from 'api/v1-api'
import Grid from '@mui/material/Grid'
import Confirmation from './Confirmation'

const VNPayCompleted = () => {
  const searchParams = new URLSearchParams(document.location.search)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    var oderId = searchParams.get('vnp_TxnRef')
    new V1Api().completeOrder(parseInt(oderId)).then(response => {})
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item md={2}></Grid>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <br />
              <br />
              <Confirmation />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default VNPayCompleted
