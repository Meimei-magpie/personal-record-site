import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

function ImageUploader() {
  const [files, setFiles] = useState([]);
  
  // ✅ 使用环境变量，如果不存在则使用本地开发地址
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={handleUpdateFiles}
        server={{
          process: {
            url: `${API_URL}/upload`,
            method: 'POST',
            withCredentials: false
          }
        }}
        name="image"
        labelIdle='拖放文件或 <span class="filepond--label-action">浏览</span>'
      />
    </div>
  );
}

export default ImageUploader;