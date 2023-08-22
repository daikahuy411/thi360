import 'dayjs/locale/vi'

// import 'moment/locale/vi'
// ** React Imports
import {
  useEffect,
  useState
} from 'react'

import UserApi from 'api/user-api'
import moment from 'moment'
// ** Third Party Imports
import {
  Controller,
  useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const initialData = {

    firstName: '',
    lastName: '',
    email: '',
    number: '',
    address: '',
    gender: -1,
    dob: null
}

moment().format("DD/MM/YYYY")

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    borderRadius: 4,
    marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
        textAlign: 'center',
        marginTop: theme.spacing(4)
    }
}))

const schema = yup.object().shape({
    firstName: yup.string().required('Họ và tên không được để trống'),
    lastName: yup.string().required('Họ và tên không được để trống'),
    phoneNumber: yup.string().nullable().notRequired().when('phoneNumber', {
        is: (value) => value?.length,
        then: (rule) => rule.min(10, '* cần tối thiểu 10 số').max(11, '* Cho phép tối đa 11 số'),
    }),
}, ['phoneNumber', 'phoneNumber'])

const TabAccount = (props) => {
    const { tab } = props
    // ** State
    const [inputValue, setInputValue] = useState('')
    const [formData, setFormData] = useState(initialData)
    const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

    // ** Hooks
    const {
        setValue,
        getValues,
        setError,
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: initialData, mode: 'onChange', resolver: yupResolver(schema) })

    useEffect(() => {
        if (formData) reset(formData)
    }, [formData])

    useEffect(() => {
        if (tab && tab == 'account') {
            me()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab])

    const me = () => {
        new UserApi()
            .me()
            .then(response => {
                const data = response.data
                setImgSrc(data.pictureUrl)
                setFormData(data)
            })
            .catch((e) => { console.log(e) })
    }

    const onSubmit = () => {
        const item = getValues()
        console.log('item-edit:', item)
        new UserApi().save(item)
            .then(response => {
                console.log(response)
                const data = response.data
                if(data.succeeded){
                    toast.success('Cập nhật dữ liệu thành công')
                    me()
                }else{
                    toast.error('Xảy ra lỗi trong quá trình cập nhật dữ liệu')
                }
            })
            .catch((e) => console.log(e))
    }

    const handleInputImageChange = file => {
        const reader = new FileReader()
        const { files } = file.target
        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result)
            reader.readAsDataURL(files[0])
            if (reader.result !== null) {
                setInputValue(reader.result)
            }
        }
    }

    const handleInputImageReset = () => {
        setInputValue('')
        setImgSrc(formData.pictureUrl)
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ImgStyled src={imgSrc} alt='Profile Pic' />
                                <div>
                                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                                        Chọn ảnh
                                        <input
                                            hidden
                                            type='file'
                                            value={inputValue}
                                            accept='image/png, image/jpeg'
                                            onChange={handleInputImageChange}
                                            id='account-settings-upload-image'
                                        />
                                    </ButtonStyled>
                                    <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                                        Hủy bỏ
                                    </ResetButtonStyled>
                                    <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
                                        Chỉ cho phép ảnh có định dạng PNG hoặc JPEG. Dung lượng tối đa 1mb.
                                    </Typography>
                                </div>
                            </Box>
                        </CardContent>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='firstName'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <TextField
                                                    fullWidth
                                                    label='Họ & tên đệm'
                                                    placeholder='Nguyễn Văn'
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    error={Boolean(errors.firstName)}
                                                />
                                            )}
                                        />
                                        {errors.firstName && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='lastName'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <TextField
                                                    fullWidth
                                                    label='Tên'
                                                    placeholder='A'
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                    error={Boolean(errors.lastName)}
                                                />
                                            )}
                                        />
                                        {errors.lastName && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='email'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <TextField
                                                    disabled
                                                    fullWidth
                                                    type='email'
                                                    label='Email'
                                                    value={value ?? ''}
                                                    placeholder='john.doe@example.com'
                                                    onChange={onChange}
                                                    style={{ disabled: true }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='phoneNumber'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <TextField
                                                    fullWidth
                                                    type='number'
                                                    label='Điện thoại'
                                                    value={value ?? ''}
                                                    placeholder='098 463 5688'
                                                    onChange={onChange}
                                                    error={Boolean(errors.phoneNumber)}
                                                />
                                            )}
                                        />
                                        {errors.phoneNumber && (
                                            <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='address'
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <TextField
                                                    fullWidth
                                                    label='Địa chỉ'
                                                    placeholder='Số 1, Đường A, Phường B, Quận C, TP Hà Nội'
                                                    value={value ?? ''}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='gender'
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <>
                                                    <InputLabel>Giới tính</InputLabel>
                                                    <Select
                                                        label='Giới tính'
                                                        value={value ?? '0'}
                                                        onChange={onChange}
                                                    >
                                                        <MenuItem value='-1'>Chọn giới tính</MenuItem>
                                                        <MenuItem value='0'>Nam</MenuItem>
                                                        <MenuItem value='1'>Nữ</MenuItem>
                                                    </Select>
                                                </>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='dob'
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                    <DatePicker
                                                        label="Ngày sinh"
                                                        value={moment(value) ?? null}
                                                        inputFormat="DD/MM/YYYY"
                                                        onChange={onChange}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                                        Cập nhật
                                    </Button>
                                    <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                                        Hủy bỏ
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </form>
                </Card>
            </Grid>

            {/* Delete Account Card */}
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Xóa tài khoản của bạn' />
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ mb: 4 }}>
                                <FormControl>
                                    <Controller
                                        name='checkbox'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                label='Tôi xác nhận xóa tài khoản của mình'
                                                sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        size='small'
                                                        name='validation-basic-checkbox'
                                                        sx={errors.checkbox ? { color: 'error.main' } : null}
                                                    />
                                                }
                                            />
                                        )}
                                    />
                                    {errors.checkbox && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                                            Bạn cần xác nhận nếu bạn muốn xóa tài khoản
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                                Xóa tài khoản
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TabAccount
