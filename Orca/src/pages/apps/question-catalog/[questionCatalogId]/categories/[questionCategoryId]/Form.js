import {
  useEffect,
  useState
} from 'react'

import { QuestionCategoryApi } from 'api/catalog-api'
import CatalogDialog from 'pages/shared/catalog'
import { Controller } from 'react-hook-form'
import { CatalogType } from 'types/CatalogType'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'

const EditForm = (props) => {
  const [values, setValues] = useState({ name: '' })

  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  // const handleChange = prop => event => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  console.log('props:', props)

  useEffect(() => {
    setParentSelected({ parentId: props.item.parentId, parentName: props.item.parentName });
    // setValues({ ...values, name: props.item.name })
    values.name = props.item.name
  }, [props.item])

  /*
  * handle parent
  */
  const [parentSelected, setParentSelected] = useState({ parentId: 0, parentName: '' })
  const handleSelectedParent = (selectedId) => {
    QuestionCategoryApi.get(selectedId)
      .then(response => {
        if (response.data) {
          setParentSelected({ parentId: selectedId, parentName: response.data.name });
          

          props.parentCallback(selectedId);
        }
      })
  }

  const cleanParent = () => {
    setParentSelected({ parentId: 0, parentName: '' });
  }
  /*
  * end handle parent
  */

  return (
    <>
      <form onSubmit={e => e.preventDefault()} defaultValue={props.item}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục cha</InputLabel>              
              <OutlinedInput
                id='outlined-adornment-parent-category'
                inputprops={{
                  readOnly: true,
                  className: 'Mui-disabled',
                }}
                value={parentSelected.parentName ?? ''}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' edge='end' onClick={cleanParent}>
                      <DeleteOutline />
                    </IconButton>
                    &nbsp;
                    <IconButton
                      edge='end'
                      onClick={() => {
                        setOpenCatalogDialog(true)
                      }}
                    >
                      <FolderIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label='Danh mục cha'
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='name'
                control={props.control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={ value ?? values.name}
                    label='Tên'
                    InputLabelProps={{ shrink: true }}
                    required
                    onChange={onChange}
                    error={Boolean(props.errors.name)}
                    aria-describedby='validation-schema-name'
                  />
                )}
              />
              {props.errors.name && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-name'>
                  {props.errors.name.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='description'
                control={props.control}
                rules={{ required: false }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    value={value ?? ''}
                    label='Mô tả'
                    InputLabelProps={{ shrink: true }}
                    onChange={onChange}
                  />
                )}
              />
            </FormControl>
          </Grid> */}
        </Grid>
      </form>

      {openCatalogDialog && (
        <CatalogDialog
          catalogType={CatalogType.QUESTION_CATEGORY}
          excludedId={0}
          onNodeSelected={nodeId => { handleSelectedParent(nodeId) }}
          onClose={() => {
            setOpenCatalogDialog(false)
          }}
          open={openCatalogDialog}
        />
      )}
    </>
  )
}

export default EditForm
