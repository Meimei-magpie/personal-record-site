const multer = require('multer');

// 设置存储位置和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Vercel 的临时存储路径：/tmp。上传的文件将在 Vercel 环境中暂时存储。
    cb(null, '/tmp/uploads');  // 临时存储路径
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // 生成唯一文件名
  }
});

// 初始化 multer 上传配置
const upload = multer({ storage });

// Vercel 无服务器函数
module.exports = (req, res) => {
  if (req.method === 'POST') {
    // 处理文件上传请求
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });  // 返回错误信息
      }
      if (!req.file) {
        return res.status(400).send('No file uploaded.');  // 如果没有文件，返回错误
      }
      // 返回文件的 URL，指向 Vercel 临时存储路径（或者你可以返回外部存储服务的 URL）
      res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
    });
  } else {
    // 如果请求不是 POST 方法，返回 Method Not Allowed
    res.status(405).send('Method Not Allowed');
  }
}; 
