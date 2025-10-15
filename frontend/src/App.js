import React from 'react';
import WorldMap from './components/WorldMap';
import UserProfile from './components/UserProfile';
import Editor from './components/Editor';
import ImageUploader from './components/ImageUploader';
import React, { useEffect } from 'react';

function App() {
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
useEffect(() => {
    console.log('当前API基础地址:', process.env.REACT_APP_API_URL);
    // 你也可以打印整个process.env对象来查看所有可用的环境变量（注意：只有REACT_APP_开头的变量会被嵌入）
    // console.log('所有环境变量:', process.env);
  }, []); // 空依赖数组意味着这个effect只在组件挂载后运行一次
}

export default App;
