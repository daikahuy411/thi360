// ** Demo Components
import ToastBlank from 'views/components/toast/ToastBlank'
import ToastCustom from 'views/components/toast/ToastCustom'
import ToastCustomPosition from 'views/components/toast/ToastCustomPosition'
import ToastEmoji from 'views/components/toast/ToastEmoji'
import ToastError from 'views/components/toast/ToastError'
import ToastMultiLine from 'views/components/toast/ToastMultiLine'
import ToastPromise from 'views/components/toast/ToastPromise'
// ** Source code imports
import * as source from 'views/components/toast/ToastSourceCode'
import ToastSuccess from 'views/components/toast/ToastSuccess'
import ToastThemed from 'views/components/toast/ToastThemed'

import CardSnippet from '@core/components/card-snippet'
// ** Custom Components Imports
import PageHeader from '@core/components/page-header'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const ReactHotToasts = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <PageHeader
        subtitle={<Typography variant='body2'>Smoking hot React notifications.</Typography>}
        title={
          <Typography variant='h5'>
            <Link href='https://github.com/timolins/react-hot-toast' target='_blank'>
              React Hot Toasts
            </Link>
          </Typography>
        }
      />
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastBlankJSXCode
          }}
        >
          <ToastBlank />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastMultiLineJSXCode
          }}
        >
          <ToastMultiLine />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastSuccessJSXCode
          }}
        >
          <ToastSuccess />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastErrorJSXCode
          }}
        >
          <ToastError />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastPromiseJSXCode
          }}
        >
          <ToastPromise />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastEmojiJSXCode
          }}
        >
          <ToastEmoji />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastThemedJSXCode
          }}
        >
          <ToastThemed />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastCustomJSXCode
          }}
        >
          <ToastCustom />
        </CardSnippet>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardSnippet
          title=''
          code={{
            tsx: null,
            jsx: source.ToastCustomPositionJSXCode
          }}
        >
          <ToastCustomPosition />
        </CardSnippet>
      </Grid>
    </Grid>
  )
}

export default ReactHotToasts
