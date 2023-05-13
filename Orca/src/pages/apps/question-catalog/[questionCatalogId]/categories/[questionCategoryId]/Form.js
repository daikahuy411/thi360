import { useState } from 'react'

import CatalogDialog from 'src/pages/shared/catalog'
import { CatalogType } from 'src/types/CatalogType'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'

const EditForm = () => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const [openCatalogDialog, setOpenCatalogDialog] = useState(false)

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth  variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục cha</InputLabel>
              <OutlinedInput
                id='outlined-adornment-parent-category'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' edge='end'>
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
            <TextField fullWidth  label='Tên' />
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={3} fullWidth  label='Mô tả' />
          </Grid>
        </Grid>
      </form>
      {openCatalogDialog && (
        <CatalogDialog
          catalogType={CatalogType.EXAM_CATEGORY}
          excludedId={0}
          onNodeSelected={nodeId => {
            // new CatalogApi(CatalogType.REGION_CATALOG)
            //   .get(parseInt(nodeId))
            //   .then(response => {
            //     let item = this.state.item;
            //     item.RegionCatalogId = response.data.Value.Id;
            //     item.RegionCatalogName = response.data.Value.Name;
            //     this.setState({ item: item });
            //   });
          }}
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
