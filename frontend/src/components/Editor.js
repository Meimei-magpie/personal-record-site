import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <ReactQuill value={content} onChange={handleChange} />
    </div>
  );
}

export default Editor;