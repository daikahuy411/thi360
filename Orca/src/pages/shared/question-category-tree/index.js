import 'react-dropdown-tree-select/dist/styles.css'

import React from 'react'

import DropdownTreeSelect from 'react-dropdown-tree-select'

import styles from './styles.module.css'

export default function QuestionCategoryTree({ open, onClose, onNodeSelected = null }) {
  const data = {
    label: 'search me',
    value: 'searchme',
    children: [
      {
        label: 'search me too',
        value: 'searchmetoo',
        children: [
          {
            label: 'No one can get me',
            value: 'anonymous'
          }
        ]
      }
    ]
  }

  const onChange = (currentNode, selectedNodes) => {
    console.log('onChange::', currentNode, selectedNodes)
  }
  const onAction = (node, action) => {
    console.log('onAction::', action, node)
  }
  const onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
  }

  return (
    <DropdownTreeSelect
      data={data}
      texts={{ placeholder: 'Chọn Danh mục Câu hỏi' }}
      onChange={onChange}
      className={styles.bootstrapdemo}
      onAction={onAction}
      onNodeToggle={onNodeToggle}
    />
  )
}
