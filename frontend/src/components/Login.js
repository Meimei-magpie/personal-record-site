import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // 发送请求到后端进行登录验证
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || '登录失败');
        return;
      }

      const data = await response.json();
      const token = data.token;

      // 登录成功，存储 token 到 localStorage
      localStorage.setItem('token', token);

      // 调用父组件的 onLogin 函数更新登录状态
      onLogin(true);
    } catch (error) {
      console.error('登录请求失败:', error);
      setErrorMessage('登录请求失败，请稍后再试');
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
      <button
        onClick={handleLogin}
        style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white' }}
      >
        登录
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;
