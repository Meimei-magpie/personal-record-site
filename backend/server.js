const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

// ✅ 使用环境变量，如果找不到就用默认值
const PORT = process.env.PORT || 5000;

// ✅ 配置CORS，允许前端访问
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// ✅ 使用内存存储（避免云平台文件丢失问题）
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 限制5MB
  }
});

// ✅ 图片上传接口 - 返回模拟响应
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  // 在生产环境中，这里应该将文件上传到云存储
  // 现在先返回一个模拟的响应
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
      upload: '/upload'
    }
  });
});

// ✅ 使用环境变量中的端口
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/health`);
  console.log(`前端域名: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});