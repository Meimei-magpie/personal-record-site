import React from 'react';
import WorldMap from './components/WorldMap';
import UserProfile from './components/UserProfile';
import Editor from './components/Editor';
import ImageUploader from './components/ImageUploader';
import React, { useEffect } from 'react';

function App() {
useEffect(() => {
    // 打印环境变量的值
    console.log('环境变量 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <WorldMap />
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        <h1>个人记录宏观信息</h1>
      </div>
      <div style={{ position: 'absolute', top: '100px', left: '20px', color: 'white' }}>
        <h2>个人介绍</h2>
        <UserProfile />
      </div>
      <div style={{ position: 'absolute', top: '300px', left: '20px', color: 'white' }}>
        <h2>宏观解读</h2>
        <Editor />
      </div>
      <div style={{ position: 'absolute', top: '500px', left: '20px', color: 'white' }}>
        <h2>上传图片</h2>
        <ImageUploader />
      </div>
    </div>
  );
}

export default App;
