// ** React Imports
import { useState } from 'react'

import UserApi from 'api/user-api'
import { useAuth } from 'hooks/useAuth'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Third Party Imports
import * as yup from 'yup'

// ** Icon Imports
import Icon from '@core/components/icon'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
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

const defaultValues = {
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: ''
}

const schema = yup.object().shape({
    currentPassword: yup.string().required('Mật khẩu cũ không được để trống'),
    newPassword: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            'Phải chứa 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
        )
        .required(),
    confirmNewPassword: yup
        .string()
        .required('Nhập lại mật khẩu mới không được để trống')
        .oneOf([yup.ref('newPassword')], 'Mật khẩu mới & Nhập lại mật khẩu không khớp')
})

const ChangePasswordCard = () => {
    const auth = useAuth()
    // ** States
    const [values, setValues] = useState({
        showNewPassword: false,
        showCurrentPassword: false,
        showConfirmNewPassword: false
    })

    // ** Hooks
    const {
        setValue,
        getValues,
        setError,
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues, resolver: yupResolver(schema) })

    const handleClickShowCurrentPassword = () => {
        setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
    }

    const handleClickShowNewPassword = () => {
        setValues({ ...values, showNewPassword: !values.showNewPassword })
    }

    const handleClickShowConfirmNewPassword = () => {
        setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
    }

    const onPasswordFormSubmit = () => {
        const item = getValues()
        const param = {
            oldPass: item.currentPassword,
            newPass: item.newPassword
        }
        new UserApi().changePassword(param)
            .then(response => {
                const data = response.data
                if (data.isSuccess) {
                    toast.success(data.message)
                    auth.logout()
                }
            })
            .catch((e) => {
                console.log(e)
                const err = e.response.data
                if (err) {
                    if (err.oldPassword) {
                        setError('currentPassword', {
                            type: 'manual',
                            message: err.oldPassword
                        })
                    }
                } else {
                    toast.error('Xảy ra lỗi trong quá trình xử lý dữ liệu. Bạn vui lòng thử lại sau!')
                }
            })
    }

    return (
        <Card>
            <CardHeader title='Đổi mật khẩu' />
            <CardContent>
                <form onSubmit={handleSubmit(onPasswordFormSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='input-current-password' error={Boolean(errors.currentPassword)}>
                                    Mật khẩu hiện tại
                                </InputLabel>
                                <Controller
                                    name='currentPassword'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <OutlinedInput
                                            autoFocus
                                            value={value ?? ''}
                                            label='Mật khẩu hiện tại'
                                            onChange={onChange}
                                            id='input-current-password'
                                            error={Boolean(errors.currentPassword)}
                                            type={values.showCurrentPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onMouseDown={e => e.preventDefault()}
                                                        onClick={handleClickShowCurrentPassword}
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
                                    Mật khẩu mới
                                </InputLabel>
                                <Controller
                                    name='newPassword'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <OutlinedInput
                                            value={value ?? ''}
                                            label='Mật khẩu mới'
                                            onChange={onChange}
                                            id='input-new-password'
                                            error={Boolean(errors.newPassword)}
                                            type={values.showNewPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onClick={handleClickShowNewPassword}
                                                        onMouseDown={e => e.preventDefault()}
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
                                    Nhập lại mật khẩu mới
                                </InputLabel>
                                <Controller
                                    name='confirmNewPassword'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <OutlinedInput
                                            value={value ?? ''}
                                            label='Nhập lại mật khẩu mới'
                                            onChange={onChange}
                                            id='input-confirm-new-password'
                                            error={Boolean(errors.confirmNewPassword)}
                                            type={values.showConfirmNewPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        edge='end'
                                                        onMouseDown={e => e.preventDefault()}
                                                        onClick={handleClickShowConfirmNewPassword}
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
                            <Alert severity="info">
                                    <AlertTitle>Lưu ý</AlertTitle>
                                    <li>Mật khẩu phải có độ dài tối thiểu 6 ký tự - nhiều hơn sẽ an toàn hơn</li>
                                    <li>Có ít nhất 1 ký tự viết hoa và 1 ký tự viết thường</li>
                                    <li>Có ít nhất một số, ký tự đặc biệt hoặc khoảng trắng</li>
                                </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' type='submit' sx={{ mr: 3 }}>
                                Lưu thay đổi
                            </Button>
                            <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                                Hủy bỏ
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default ChangePasswordCard
