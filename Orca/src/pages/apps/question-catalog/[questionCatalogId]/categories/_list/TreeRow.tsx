import React, { useState } from 'react'

import Link from 'next/link'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DescriptionIcon from '@mui/icons-material/Description'
import EditIcon from '@mui/icons-material/Edit'
import Folder from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
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
          <IconButton aria-label='filter' component={Link} href={`/apps/exam-category/edit/${item.key}`}>
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
      </TableRow>
      {!isCollapsed && <>{children}</>}
    </>
  )
}
