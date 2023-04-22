import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
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
import FormHelperText from '@mui/material/FormHelperText'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import FolderIcon from '@mui/icons-material/FolderOpen'
import Input from '@mui/material/Input'
import CatalogDialog from 'src/views/shared/Catalog/Dialog'
import CatalogApi from 'src/api/catalog-api'
import { CatalogType } from 'src/types/CatalogType'
import Icon from 'src/@core/components/icon'

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
            <FormControl fullWidth size='small' variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-parent-category'>Danh mục cha</InputLabel>
              <OutlinedInput
                size='small'
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
            <TextField fullWidth size='small' label='Tên' />
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={3} fullWidth size='small' label='Mô tả' />
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
