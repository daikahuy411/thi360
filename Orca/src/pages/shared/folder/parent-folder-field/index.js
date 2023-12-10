import {
  useEffect,
  useState
} from 'react'

import FolderSelectorDiaglog from 'pages/shared/folder/folder-selector'

import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FolderIcon from '@mui/icons-material/FolderOpen'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

export default function ParentFolderField({ api, type, parentId, onSave }) {
  const [openFolderSelector, setOpenFolderSelector] = useState(false)
  const [path, setPath] = useState('')
  const [currentParentId, setCurrentParentId] = useState(parentId)

  const clearParent = () => {
    setCurrentParentId(0)
    setPath('')
  }

  useEffect(() => {
    if (!parentId || parentId === 0) {
      setPath('')
      return
    }
    updateParent(parentId)
  }, [parentId])

  useEffect(() => {
    if (!currentParentId || currentParentId === 0) {
      setPath('')
      return
    }
    updateParent(currentParentId)
  }, [currentParentId])

  const updateParent = parentId => {
    api.get(parentId).then(response => {
      let paths = response.data.ancestors.map(item => item.name)
      paths.push(response.data.name)
      setPath(paths.join(' / '))
    })
  }

  return (
    <>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-parent-category'>Thư mục cha</InputLabel>
        <OutlinedInput
          id='outlined-adornment-parent-category'
          inputprops={{
            readOnly: true,
            className: 'Mui-disabled',
            shrink: true
          }}
          InputLabelProps={{ shrink: true }}
          value={path}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton aria-label='' edge='end' onClick={clearParent}>
                <DeleteOutline />
              </IconButton>
              &nbsp;
              <IconButton
                edge='end'
                onClick={() => {
                  setOpenFolderSelector(true)
                }}
              >
                <FolderIcon />
              </IconButton>
            </InputAdornment>
          }
          label='Thư mục cha'
        />
      </FormControl>
      {openFolderSelector && (
        <FolderSelectorDiaglog
          onSave={nodeId => {
            setCurrentParentId(nodeId)
            if (onSave) {
              onSave(nodeId)
            }
            setOpenFolderSelector(false)
          }}
          excludedId={0}
          onClose={() => setOpenFolderSelector(false)}
          folderType={type}
        />
      )}
    </>
  )
}
