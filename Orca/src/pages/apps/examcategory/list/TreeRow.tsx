import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Folder from '@mui/icons-material/Folder'
import DescriptionIcon from '@mui/icons-material/Description'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type TreeRowProps = {
  item: any
  excludedId: number
  level: number
}

export default function TreeRow(props: TreeRowProps) {
  const { item } = props

  const [isCollapsed, setIsCollapsed] = useState(true)
  const entityIcon = item.children.length > 0 ? isCollapsed ? <Folder /> : <FolderOpenIcon /> : <DescriptionIcon />

  const children = (item.children || [])
    .filter((x: any) => {
      return x.id !== props.excludedId
    })
    .map((child: any) => {
      return (
        <TreeRow
          level={props.level + 1}
          excludedId={props.excludedId}
          key={child.id}
          // nodeId={child.Id}
          item={child}
        />
      )
    })

  return (
    <>
      <TableRow onClick={() => setIsCollapsed(!isCollapsed)}>
        <TableCell padding='checkbox'>
          <Checkbox />
        </TableCell>
        <TableCell component='th' scope='row'>
          <IconButton aria-label='filter' component={Link} href={`/apps/examcategory/edit/${item.key}`}>
            <EditIcon />
          </IconButton>
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
        <TableCell align='right'>{item.totalUser}</TableCell>
        <TableCell align='right'>{item.group}</TableCell>
      </TableRow>
      {!isCollapsed && <>{children}</>}
    </>
  )
}
