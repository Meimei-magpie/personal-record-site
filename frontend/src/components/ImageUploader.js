import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

function ImageUploader() {
  const [files, setFiles] = useState([]);

  const handleUpdateFiles = (fileItems) => {
    // 将文件数组更新到状态
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div>
      <h2>上传图片</h2>
      <FilePond
        files={files}  // 绑定文件状态
        onupdatefiles={handleUpdateFiles}  // 处理文件更新
        server="https://railway.com/project/ce721a56-8f3f-4d9c-9fad-be27896dcbeb/upload"  // 上传路径，指向 Vercel 的 upload.js
      />
    </div>
  );
}

export default ImageUploader;