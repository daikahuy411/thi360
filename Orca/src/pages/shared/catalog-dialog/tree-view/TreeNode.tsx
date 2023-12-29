import React from 'react'

import Icon from '@core/components/icon'
import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

type TreeNodeProps = TreeItemProps & {
  item: any
  excludedId: number
}

type StyledTreeItemProps = TreeItemProps & {
  label?: string
  hasChildren?: boolean
}

export default function TreeNode(props: TreeNodeProps) {
  const { item } = props
  const hasChildren = item.children && item.children.length > 0 ? true : false
  const children = (item.children || []).map((child: any) => {
    return <TreeNode excludedId={0} key={child.key} nodeId={child.key} item={child} />
  })

  return (
    <StyledTreeItem hasChildren={hasChildren} key={item.key} nodeId={item.key.toString()} label={item.title}>
      {children}
    </StyledTreeItem>
  )
}

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

const StyledTreeItem = (props: StyledTreeItemProps) => {
  // ** Props
  const { hasChildren, label, ...other } = props

  return (
    <StyledTreeItemRoot
      {...other}
      label={
        <Box sx={{ py: 1, display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
          {hasChildren === true && <Icon icon={'mdi:folder'} color='inherit' />}
          {hasChildren === false && <Icon icon={'mdi:file-outline'} color='inherit' />}
          <Typography variant='body1' sx={{ flexGrow: 1, fontWeight: 'inherit' }}>
            {label}
          </Typography>
          {/* {labelInfo ? (
            <Typography variant='caption' color='inherit'>
              {labelInfo}
            </Typography>
          ) : null} */}
        </Box>
      }
    />
  )
}
