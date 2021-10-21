// TextEditor.tsx
import React, { useState, useEffect, useRef, memo } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = (props) =>{
  console.log(props);
  const OnChange = (value) => {
    let editorval = ((value.trim()=='' || value=='<p><br></p>')?true:false)
    //props.setEditorVal(editorval)
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'code'],
      ['clean'],
    ],
  };
  
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'code',
  ];
  
  return <>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={OnChange}
      />
    </>
};

export default TextEditor();