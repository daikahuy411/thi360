import {
  useEffect,
  useState
} from 'react'

import UserApi from 'api/user-api'
import authConfig from 'configs/auth'
// ** Context
import { useAuth } from 'hooks/useAuth'
import Draggable from 'react-draggable'
import {
  Controller,
  useForm
} from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Paper from '@mui/material/Paper'

function PaperComponent(props) {
    return (
        <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}
const SelfRemoveAccount = () => {
    // ** Hooks
    const { logout } = useAuth()
    const [openConfirmRemove, setOpenConfirmRemove] = useState(false)
    const {
        control,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { checkbox: false } })

    useEffect(() => {

    }, [])

    const onSubmit = () => setOpenConfirmRemove(true)
    const handleCloseConfirmRemove = () => setOpenConfirmRemove(false)
    const handleSelfRemove = () => {
        const userInfo = window.localStorage.getItem(authConfig.storageUserDataKeyName)
        const userObj = JSON.parse(userInfo)       

        new UserApi()
            .selfRemoveAccount({ id: userObj.id })
            .then(response => {
                if (response.data.isSuccess) {
                    toast.success('Xóa dữ liệu thành công.')
                    logout()
                } else {
                    setOpenConfirmRemove(false)
                    toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
                }
            })
            .catch(e => {
                setOpenConfirmRemove(false)
                toast.error('Xảy ra lỗi trong quá trình xóa dữ liệu. Vui lòng thử lại sau!')
            })
    }

    return (
        <>
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
                    <Dialog
                        open={openConfirmRemove}
                        onClose={handleCloseConfirmRemove}
                        PaperComponent={PaperComponent}
                        aria-labelledby='draggable-dialog-title'
                    >
                        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
                            Xác nhận
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Chọn <strong>Đồng Ý</strong> đồng nghĩa với việc tài khoản của bạn sẽ được xóa khỏi hệ thống và không thế khôi phục lại. Bạn có muốn tiếp tục xóa tài khoản hiện tại không?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseConfirmRemove}>
                                {' '}
                                Hủy bỏ{' '}
                            </Button>
                            <Button onClick={handleSelfRemove} color='error'>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>
        </>
    )
}

export default SelfRemoveAccount;