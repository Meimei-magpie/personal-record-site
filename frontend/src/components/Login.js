import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 清空之前的错误信息
    setErrorMessage('');

    // 向后端发送登录请求
    try {
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

      // 存储 token 到 localStorage
      localStorage.setItem('token', token);

      // 调用父组件的 onLogin 函数更新登录状态
      onLogin(true);
    } catch (error) {
      console.error('登录请求失败:', error);
      setErrorMessage('登录请求失败，请稍后再试');
    }
  };

  return (
    <div style={{ color: 'white' }}>
      <h2>登录</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            用户名:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div>
          <label>
            密码:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div>
          <button type="submit" style={{ marginTop: '10px' }}>登录</button>
        </div>
      </form>
    </div>
  );
}

export default Login;