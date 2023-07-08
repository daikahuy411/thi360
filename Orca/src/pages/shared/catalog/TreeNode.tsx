import React from 'react'

import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem'

type TreeNodeProps = TreeItemProps & {
  item: any
  excludedId: number
}

export default function TreeNode(props: TreeNodeProps) {
  const { item } = props

  const children = (item.children || [])
    .filter((x: any) => {
      return x.key !== props.excludedId
    })
    .map((child: any, index: number) => {
      return <TreeNode excludedId={props.excludedId} key={`child-${index}`} nodeId={child.key} item={child} />
    })

  return (
    <TreeItem key={`tree-item-${item.key}`} nodeId={item.key} label={item.title}>
      {children}
    </TreeItem>
  )
}
