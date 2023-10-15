import * as React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import Configuration from 'configs/auth'

export interface Props {
  content: string
  isReadOnly?: boolean
  onChange(data: string): void
}

export interface States {}

class ContentEditor extends React.Component<Props, States> {
  onChange = (data: string) => {
    if (this.props.onChange) {
      this.props.onChange(data)
    }
  }

  render() {
    return (
      <CKEditor
        editor={Editor}
        data={this.props.content}
        onChange={(event, editor) => {
          const data = editor.getData()
          this.onChange(data)
        }}
        config={{
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
              'blockQuote',
              '|',
              'undo',
              'redo'
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
    )
  }
}

export default ContentEditor
