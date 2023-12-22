// components/custom-editor.js

import React from 'react'

import Editor from 'ckeditor5-custom-build/build/ckeditor'

import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo'
  ]
}

function ContentEditor({ data, isReadOnly, onChange }) {
  return (
    <CKEditor
      editor={Editor}
      data={data}
      config={editorConfiguration}
      onChange={(event, editor) => {
        const data = editor.getData()
        if (onChange) {
          onChange(data)
        }
      }}
    />
  )
}

export default ContentEditor
