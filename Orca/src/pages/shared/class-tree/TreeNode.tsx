import React from 'react'

import {
  mdilAccount,
  mdilFolder,
  mdilLabel
} from '@mdi/light-js'
import IconReact from '@mdi/react'
import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Styled TreeItem component
const StyledTreeItemRoot = styled(TreeItem)<TreeItemProps>(({ theme }) => ({
  '&:hover > .MuiTreeItem-content:not(.Mui-selected)': {
    backgroundColor: theme.palette.action.hover
  },
  '& .MuiTreeItem-content': {
    paddingRight: theme.spacing(3),
    borderTopRightRadius: theme.spacing(4),
    borderBottomRightRadius: theme.spacing(4),
    fontWeight: theme.typography.fontWeightMedium
  },
  '& .MuiTreeItem-label': {
    fontWeight: 'inherit',
    paddingRight: theme.spacing(3)
  },
  '& .MuiTreeItem-group': {
    marginLeft: 0,
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(4),
      fontWeight: theme.typography.fontWeightRegular
    }
  }
}))

type TreeNodeProps = TreeItemProps & {
  item: any
  excludedId: number
}

type StyledTreeItemProps = TreeItemProps & {
  label?: string
  type?: number
  nodeId?: string
}

export default function TreeNode(props: TreeNodeProps) {
  const { item } = props

  const children = (item.children || [])
    .filter((x: any) => {
      return x.Id !== props.excludedId
    })
    .map((child: any) => {
      return <TreeNode excludedId={props.excludedId} key={child.id} nodeId={child.id.toString()} item={child} />
    })

  return (
    <StyledTreeItem key={item.id} type={item.type} nodeId={item.id.toString()} label={item.name}>
      {children}
    </StyledTreeItem>
  )
}

const StyledTreeItem = (props: StyledTreeItemProps) => {
  const { nodeId, label, type, ...other } = props

  return (
    <StyledTreeItemRoot
      {...other}
      nodeId={nodeId}
      label={
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
          {nodeId != '0' && (
            <>
              {type == 1 && <IconReact path={mdilFolder} title='Folder' color='black' size={1} />}
              {type == 2 && <IconReact path={mdilAccount} title='Folder' color='black' size={1} />}
            </>
          )}
          {nodeId == '0' && <IconReact path={mdilLabel} title='Folder' color='black' size={1} />}
          <Typography variant='body1' sx={{ flexGrow: 1, fontWeight: 'inherit' }}>
            {label}
          </Typography>
        </Box>
      }
    />
  )
}
