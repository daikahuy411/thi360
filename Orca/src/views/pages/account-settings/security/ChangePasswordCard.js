// ** React Imports
import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Third Party Imports
import * as yup from 'yup'

// ** Icon Imports
import Icon from '@core/components/icon'
import { yupResolver } from '@hookform/resolvers/yup'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  confirmNewPassword: ''
}

const schema = yup.object().shape({
  currentPassword: yup.string().min(8).required(),
  newPassword: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
    )
    .required(),
  confirmNewPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

const ChangePasswordCard = () => {
  // ** States
  const [values, setValues] = useState({
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false
  })

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  const onPasswordFormSubmit = () => {
    toast.success('Password Changed Successfully')
    reset(defaultValues)
  }

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-current-password' error={Boolean(errors.currentPassword)}>
                  Current Password
                </InputLabel>
                <Controller
                  name='currentPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Current Password'
                      onChange={onChange}
                      id='input-current-password'
                      error={Boolean(errors.currentPassword)}
                      type={values.showCurrentPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={handleMouseDownCurrentPassword}
                          >
                            <Icon icon={values.showCurrentPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.currentPassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-new-password' error={Boolean(errors.newPassword)}>
                  New Password
                </InputLabel>
                <Controller
                  name='newPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='New Password'
                      onChange={onChange}
                      id='input-new-password'
                      error={Boolean(errors.newPassword)}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.newPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.newPassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-confirm-new-password' error={Boolean(errors.confirmNewPassword)}>
                  Confirm New Password
                </InputLabel>
                <Controller
                  name='confirmNewPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Confirm New Password'
                      onChange={onChange}
                      id='input-confirm-new-password'
                      error={Boolean(errors.confirmNewPassword)}
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirmNewPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmNewPassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: 1, color: 'text.secondary' }}>Password Requirements:</Typography>
              <Box
                component='ul'
                sx={{ pl: 4, mb: 0, '& li': { mb: 4, color: 'text.secondary', '&::marker': { fontSize: '1.25rem' } } }}
              >
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase & one uppercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' sx={{ mr: 3 }}>
                Save Changes
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
