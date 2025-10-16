import React, { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import UserProfile from './components/UserProfile';
import Editor from './components/Editor';
import ImageUploader from './components/ImageUploader';
import Login from './components/Login'; // 引入 Login 组件

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 检查用户是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // 登录状态改变时更新状态
  const handleLoginStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 世界地图和个人简介对所有人开放 */}
      <WorldMap />
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
        <h1>个人记录宏观信息</h1>
      </div>

      {/* 个人介绍显示，传递 isAuthenticated 来控制是否可以编辑 */}
      <div style={{ position: 'absolute', top: '100px', left: '20px', color: 'white' }}>
        <UserProfile isAuthenticated={isAuthenticated} />
      </div>

      {/* 如果用户已登录，显示编辑和上传功能，否则显示登录组件 */}
      {isAuthenticated ? (
        <>
          <div style={{ position: 'absolute', top: '300px', left: '20px', color: 'white' }}>
            <h2>宏观解读</h2>
            <Editor />
          </div>
          <div style={{ position: 'absolute', top: '500px', left: '20px', color: 'white' }}>
            <h2>上传图片</h2>
            <ImageUploader />
          </div>
        </>
      ) : (
        <div style={{ position: 'absolute', top: '300px', left: '20px', color: 'white' }}>
          <h2>请登录以编辑和上传内容</h2>
          <Login onLogin={handleLoginStatus} />
        </div>
      )}
    </div>
  );
}

export default App;


