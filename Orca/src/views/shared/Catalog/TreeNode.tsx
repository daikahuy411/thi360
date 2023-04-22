import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem'
import React from 'react'

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
    .map((child: any) => {
      return <TreeNode excludedId={props.excludedId} key={child.key} nodeId={child.key} item={child} />
    })

  return (
    <TreeItem key={item.key} nodeId={item.key} label={item.title}>
      {children}
    </TreeItem>
  )
}
