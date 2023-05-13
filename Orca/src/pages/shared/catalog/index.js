import React, { useState } from 'react'

import PropTypes from 'prop-types'
import Icon from 'src/@core/components/icon'
import { CatalogType } from 'src/types/CatalogType'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Tree from './Tree'

function CatalogDialog({ catalogType, open, onClose, excludedId = 0, onNodeSelected = null, acl = false }) {
  const [selectedNodeId, setSelectedNodeId] = useState(0)

  const handleNodeSelected = nodeId => {
    setSelectedNodeId(nodeId)
  }

  const onOk = () => {
    if (onNodeSelected) {
      onNodeSelected(selectedNodeId)
      onClose()
    }
  }

  return (
    <Drawer anchor='right' onClose={onClose} open={open} variant='temporary'>
      <>
        <Box
          className='customizer-header'
          sx={{
            position: 'relative',
            p: theme => theme.spacing(3.5, 5),
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            marginBottom: 2
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600, fontSize: 18, textTransform: 'uppercase' }}>
            Danh mục
          </Typography>
          <IconButton
            onClick={() => onClose()}
            sx={{
              right: 20,
              top: '50%',
              position: 'absolute',
              color: 'text.secondary',
              transform: 'translateY(-50%)'
            }}
          >
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item md={4}>
            <IconButton aria-label='filter'>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item md={4}>
            <TextField fullWidth placeholder='Tìm kiếm' size='small' />
          </Grid>
          <Grid item md={4} alignContent={'right'} alignItems={'right'}>
            <Button
              // disabled={selectedData.length == 0}
              color='primary'
              style={{ float: 'right' }}
              type='submit'
              variant='contained'
              onClick={() => {
                if (onOk) {
                  onOk()
                }
              }}
            >
              Chọn
            </Button>
          </Grid>
          <Grid item md={12} style={{ width: 360 }}>
            <Divider />
            <Tree
              acl={acl}
              catalogType={catalogType}
              excludedId={excludedId}
              onNodeSelected={handleNodeSelected}
              autoLoad={true}
            />
          </Grid>
        </Grid>
      </>
    </Drawer>
  )
}

CatalogDialog.propTypes = {
  type: CatalogType,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  open: PropTypes.bool.isRequired
}

export default CatalogDialog
