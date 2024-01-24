import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import Configuration from 'configs/auth'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import Editor from 'ckeditor5-custom-build/build/ckeditor'

export default function ContentEditor({ content, isReadOnly, onChange }) {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { CKEditor, Editor } = editorRef.current || {}
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      try {
        loadRequire()
      } catch (ex) {
        toast.error('Không thể tải editor, tự động refresh lại trang.')
        router.refresh()
      }
    }, 350)
  }, [])

  const loadRequire = () => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      Editor: require('ckeditor5-custom-build/build/ckeditor')
    }
    setEditorLoaded(true)
  }

  return editorLoaded ? (
    <CKEditor
      editor={Editor}
      data={content}
      onReady={editor => {
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        if (onChange) {
          onChange(data)
        }
      }}
      config={{
        removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
        toolbar: {
          items: [
            'ckfinder',
            '|',
            'heading',
            '|',
            'alignment',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            '|',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            'indent',
            '|',
            'insertTable',
            '|',
            'fontfamily',
            'fontsize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'subscript',
            'superscript',
            'blockQuote'
          ],
          shouldNotGroupWhenFull: false
        },
        image: {
          styles: ['alignLeft', 'alignCenter', 'alignRight'],
          resizeOptions: [
            {
              name: 'imageResize:original',
              label: 'Original',
              value: null
            },
            {
              name: 'imageResize:50',
              label: '50%',
              value: '50'
            },
            {
              name: 'imageResize:75',
              label: '75%',
              value: '75'
            }
          ],
          toolbar: [
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight',
            '|',
            'imageResize',
            '|',
            'imageTextAlternative'
          ]
        },
        ckfinder: {
          uploadUrl: `${Configuration.baserUrl}ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images&responseType=json`
        }
      }}
    />
  ) : (
    <div>Đang tải Trình soạn thảo...</div>
  )
}
