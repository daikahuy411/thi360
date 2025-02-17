// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const EditForm = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const [confirmPassValues, setConfirmPassValues] = useState({
    password: '',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmPassChange = prop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField fullWidth size='small' label='Name' placeholder='Leonard Carter' />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type='email'
            size='small'
            label='Email'
            placeholder='carterleonard@gmail.com'
            helperText='You can use letters, numbers & periods'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
            <OutlinedInput
              size='small'
              label='Password'
              value={values.password}
              id='form-layouts-basic-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              aria-describedby='form-layouts-basic-password-helper'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id='form-layouts-basic-password-helper'>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel size='small' htmlFor='form-layouts-confirm-password'>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              label='Confirm Password'
              value={confirmPassValues.password}
              id='form-layouts-confirm-password'
              size='small'
              onChange={handleConfirmPassChange('password')}
              aria-describedby='form-layouts-confirm-password-helper'
              type={confirmPassValues.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickConfirmPassShow}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    <Icon icon={confirmPassValues.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id='form-layouts-confirm-password-helper'>
              Make sure to type the same password as above
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}

export default EditForm
