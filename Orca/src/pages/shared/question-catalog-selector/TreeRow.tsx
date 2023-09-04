import React, { useState } from 'react'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DescriptionIcon from '@mui/icons-material/Description'
import Folder from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

type TreeRowProps = {
  item: any
  currentId: number
  level: number
  selectedValue: string
  onSelected: any
  disabled?: boolean
  mode: string
}

// export default function TreeRow(props: TreeRowProps) {
const TreeRow: React.FC<TreeRowProps> = (props: TreeRowProps) => {
  const { item } = props
  const { mode = 'single' } = props
  const [isCollapsed, setIsCollapsed] = useState(true)
  const entityIcon = item.children.length > 0 ? isCollapsed ? <Folder /> : <FolderOpenIcon /> : <DescriptionIcon />
  const isDisabled = item.key.toString() === props.currentId.toString() || props.disabled

  const children = (item.children || []).map((child: any, index: number) => {
    return (
      <TreeRow
        mode={mode}
        onSelected={props.onSelected}
        selectedValue={props.selectedValue}
        level={props.level + 1}
        disabled={isDisabled}
        currentId={props.currentId}
        key={`${child.key}-${index}`}
        item={child}
      />
    )
  })

  const handleChange = (event, item) => {
    if (props.onSelected) {
      if (event.target.checked) {
        props.onSelected(item)
      }
    }
  }

  //Checkbox handles
  const [selected, setSelected] = useState([0])
  const isSelected = id => selected.indexOf(id) !== -1

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
    props.onSelected(newSelected)
  }

  const isItemSelected = isSelected(item.key)

  return (
    <>
      <TableRow hover key={`${item.key}-row`} onClick={() => setIsCollapsed(!isCollapsed)}>
        <TableCell
          component='th'
          scope='row'
          onClick={event => {
            event.preventDefault()
          }}
        >
          {mode == 'single' && (
            <Radio
              disabled={isDisabled}
              value={item.key}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                handleChange(e, item)
              }}
              name='select-category'
              checked={props.selectedValue === item.key}
            />
          )}
          {mode == 'multi' && (
            <Checkbox
              disabled={isDisabled}
              value={item.key}
              checked={isItemSelected}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                handleClick(e, item.key)
              }}
              name='select-category'
            />
          )}
        </TableCell>
        <TableCell component='th' scope='row'>
          <Stack direction='row' alignItems='center' gap={1} style={{ paddingLeft: props.level * 10 }}>
            {!(item.children.length > 0) ? (
              <span style={{ display: 'inline-block', width: 24 }}></span>
            ) : (
              <ChevronRightIcon />
            )}
            {entityIcon}
            <Typography variant='body1'>{item.title}</Typography>
          </Stack>
        </TableCell>
        <TableCell align='right'>{item.createdTime}</TableCell>
      </TableRow>
      {!isCollapsed && <>{children}</>}
    </>
  )
}

export default TreeRow
