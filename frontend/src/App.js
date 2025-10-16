import React, { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import UserProfile from './components/UserProfile';
import Editor from './components/Editor';
import ImageUploader from './components/ImageUploader';

// 模拟登录状态的简单组件
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // 假设你有一个后端 API 来验证用户，登录成功后存储 token
    if (username === 'admin' && password === 'password123') {
      // 登录成功，存储 token
      const token = 'dummy-jwt-token'; // 模拟的 token
      localStorage.setItem('token', token);
      onLogin(true);
    } else {
      alert('用户名或密码错误');
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>请登录</h2>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
      />
      <br />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white' }}>
        登录
      </button>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginStatus = (status) => {
    setIsAuthenticated(status);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLoginStatus} />;
  }

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
