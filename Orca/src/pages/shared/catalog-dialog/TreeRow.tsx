import React, { useState } from 'react'

import {
  mdilChevronDown,
  mdilChevronUp,
  mdilFile,
  mdilFolder
} from '@mdi/light-js'
import IconReact from '@mdi/react'
import Radio from '@mui/material/Radio'
// import DescriptionIcon from '@mui/icons-material/Description'
// import Folder from '@mui/icons-material/Folder'
// import FolderOpenIcon from '@mui/icons-material/FolderOpen'
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
}

// export default function TreeRow(props: TreeRowProps) {
const TreeRow: React.FC<TreeRowProps> = (props: TreeRowProps) => {
  const { item } = props
  const [isCollapsed, setIsCollapsed] = useState(true)
  // const entityIcon = item.children.length > 0 ? isCollapsed ? <Folder /> : <FolderOpenIcon /> : <DescriptionIcon />
  const entityIcon =
    item.children.length > 0 ? (
      <IconReact path={mdilFolder} title='Folder' color='black' size={1} />
    ) : (
      <IconReact path={mdilFile} title='File' color='black' size={1} />
    )

  const isDisabled = item.key.toString() === props.currentId.toString() || props.disabled

  const children = (item.children || []).map((child: any, index: number) => {
    return (
      <TreeRow
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

  const handleChange = event => {
    if (props.onSelected) {
      if (event.target.checked) {
        props.onSelected(event.target.value)
      }
    }
  }

  return (
    <>
      <TableRow key={`${item.key}-row`} onClick={() => setIsCollapsed(!isCollapsed)}>
        <TableCell
          component='th'
          scope='row'
          onClick={event => {
            event.preventDefault()
          }}
        >
          <Radio
            disabled={isDisabled}
            value={item.key}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              handleChange(e)
            }}
            name='select-category'
            checked={props.selectedValue === item.key}
          />
        </TableCell>
        <TableCell component='th' scope='row'>
          <Stack direction='row' alignItems='center' gap={1} style={{ paddingLeft: props.level * 10 }}>
            {!(item.children.length > 0) ? (
              <span style={{ display: 'inline-block', width: 24 }}></span>
            ) : (
              <>
                {isCollapsed && <IconReact path={mdilChevronUp} title='Folder' color='black' size={1} />}
                {!isCollapsed && <IconReact path={mdilChevronDown} title='Folder' color='black' size={1} />}
              </>
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
