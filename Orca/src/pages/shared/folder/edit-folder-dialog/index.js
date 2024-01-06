import {
  useEffect,
  useState
} from 'react'

import { FolderType } from 'enum/FolderType'
import FolderSelectorDiaglog from 'pages/shared/folder/folder-selector'
import {
  Controller,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import LoadingSpinner from '@core/components/loading-spinner'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

import ParentFolderField from '../parent-folder-field'

const schema = yup.object().shape({
  name: yup.string().required('* bắt buộc')
})

export default function EditFolderDialog({ id = 0, api, onClose, folderType, parentId = 0, entity }) {
  const [loading, setLoading] = useState(false)
  const [openFolderSelectorDialog, setOpenFolderSelectorDialog] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  const [item, setItem] = useState(null)
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, errors }
  } = useForm({
    defaultValues: { ...(item ?? null) },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const load = () => {
    if (!entity) return
    if (entity.id === 0) return
    setLoading(true)
    api.get(entity.id).then(response => {
      setItem(response.data)
      setLoading(false)
    })
  }

  const save = () => {
    setLoading(true)
    const entity = getValues()
    entity.type = 1
    entity.parentId = parentId
    api
      .save(entity)
      .then(response => {
        setLoading(false)
        toast.success('Cập nhật thành công')
        if (onClose) {
          onClose(true)
        }
      })
      .catch(e => {
        setLoading(false)
      })
  }

  const handleClose = () => {
    if (onClose) {
      onClose(false)
    }
  }

  useEffect(() => load(), [])

  useEffect(() => {
    reset(item)
  }, [item])

  const clearParent = () => { }

  return (
    <>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>
          {item && <>Chỉnh sửa {item.name}</>}
          {!item && <>Tạo mới Thư mục</>}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={save}>
            <LoadingSpinner active={loading} minHeight={0}>
              <div style={{ padding: 5, width: 360 }}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='name'
                        fullWidth
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            value={value ?? ''}
                            label='Tên thư mục'
                            InputLabelProps={{ shrink: true }}
                            required
                            onChange={onChange}
                            error={Boolean(errors.name)}
                            aria-describedby='validation-schema-name'
                          />
                        )}
                      />
                      {errors.name && (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                          {errors.name.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <ParentFolderField
                      api={api}
                      type={folderType}
                      parentId={item ? item.parentId : parentId}
                    />
                  </Grid>
                </Grid>
              </div>
            </LoadingSpinner>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button disabled={!isValid || loading} onClick={save} variant='contained' color='primary'>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
      {openFolderSelectorDialog && (
        <FolderSelectorDiaglog onClose={() => setOpenFolderSelectorDialog(false)} folderType={FolderType.CLASS} />
      )}
    </>
  )
}
