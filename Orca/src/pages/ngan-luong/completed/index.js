import * as React from 'react'
import {
  useEffect,
  useState
} from 'react'

import V1Api from 'api/v1-api'

import LoadingSpinner from '@core/components/loading-spinner'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import Confirmation from './Confirmation'

const NLPayCompleted = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [status, setStatus] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    var token = searchParams.get('token')
    var order_code = searchParams.get('order_code')
    var errorCode = searchParams.get('error_code')

    const params = {
      orderGuid: order_code,
      token: token
    }

    setLoading(true)

    if (parseInt(errorCode) === 24) {
      new V1Api().cancelOrder(params).then(response => {
        const data = response.data
        if (data.isSuccess) {
          setIsSuccess(false)
          setStatus(24)
          setLoading(false)
        }
      })
    } else if (parseInt(errorCode) === 0) {
      new V1Api().completeOrder(params).then(response => {
        setLoading(false)

        const data = response.data
        setIsSuccess(data.isSuccess)
        setStatus(data.status)
        if (data.isSuccess) {
          setData(data.value)
        } else {
          if (data.status == 1) {
            setData(data.value)
          } else if (data.status == 2) {
            setIsSuccess(false)
            setStatus(24)
          } else if (data.status == 404) {
            setIsSuccess(false)
            setStatus(404)
          }
        }
      })
    }
  }

  return (
    <>
      <LoadingSpinner active={loading}>
        <Grid container spacing={8}>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Card>
              <CardContent>
                <br />
                <br />
                <Confirmation orderInfo={data} isSuccess={isSuccess} status={status} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </LoadingSpinner>
    </>
  )
}

export default NLPayCompleted
