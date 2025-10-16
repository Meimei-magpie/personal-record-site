import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

function ImageUploader() {
  const [files, setFiles] = useState([]);
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  console.log('当前API地址:', API_URL);

  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };
const serverConfig = {
    process: {
      url: `${API_URL}/upload`,
      method: 'POST',
      withCredentials: false
    }
  };
  
  console.log('FilePond 服务器配置:', serverConfig);
  console.log('完整上传URL:', serverConfig.process.url);

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