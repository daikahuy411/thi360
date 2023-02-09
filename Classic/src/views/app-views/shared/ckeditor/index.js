import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { Configuration } from "configs";

const CkEditor = (props) => {
  return (
    <CKEditor
      editor={Editor}
      data={props.data ?? ""}
      onChange={(event, editor) => {
        const data = editor.getData();
        if (props.onChange) {
          props.onChange(data);
        }
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
            'mediaEmbed',
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
          // Configure the available styles.
          styles: ['alignLeft', 'alignCenter', 'alignRight'],
          // Configure the available image resize options.
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
          // You need to configure the image toolbar, too, so it shows the new style
          // buttons as well as the resize buttons.
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
          uploadUrl: `${Configuration.baseUrl}ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images&responseType=json`
        },
        mediaEmbed: {
          previewsInData: true
        }
      }}
      onReady={editor => {
        // You can store the "editor" and use when it is needed
        console.log('Editor1 is ready to use!', editor);
      }}
    />
  );
};

export default CkEditor;
