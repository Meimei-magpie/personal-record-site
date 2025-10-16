const express = require('express');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// ✅ 使用环境变量，如果找不到就用默认值
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key';  // 用更强的密钥替换这个

// ✅ 配置CORS，允许前端访问
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// ✅ 解析 JSON 请求体
app.use(express.json());

// 模拟的用户数据（实际项目中可以从数据库获取）
const users = [
  {
    username: 'admin',
    password: '$2a$10$kPqH02Um94fKbBhZ0YzVOi8q0ro/ogZ2Dpxs46cGpWeKgRWi0UwmS'  // 这是加密后的 "password123"
  }
];

// ✅ 使用内存存储（避免云平台文件丢失问题）
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  }
});

// ✅ JWT 验证中间件
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // 从 Authorization 头中提取 token

  if (!token) {
    return res.status(403).json({ message: '缺少 token，访问被拒绝' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '无效的 token，访问被拒绝' });
    }
    req.user = user;  // 将用户信息附加到请求对象
    next();  // 继续执行后续的路由处理
  });
};

// ✅ 用户登录接口 (生成 JWT token)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 查找用户
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: '用户不存在' });
  }

  // 比对密码
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: '密码验证失败' });
    }

    if (!isMatch) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 密码匹配成功，生成 JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });  // 返回生成的 token
  });
});

// ✅ 保护的文件上传接口
app.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({
    fileUrl: 'https://via.placeholder.com/300',
    message: '文件上传请求已收到（实际存储功能待实现）',
    filename: req.file.originalname,
    size: req.file.size
  });
});

// ✅ 健康检查接口（重要！）
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '后端服务运行正常',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ 根路径也返回健康信息
app.get('/', (req, res) => {
  res.json({
    message: '个人记录网站后端服务',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      upload: '/upload',
      login: '/login'
    }
  });
});

// ✅ 使用环境变量中的端口
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
  console.log(`前端域名: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
