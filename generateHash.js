const bcrypt = require('bcryptjs');

// 明文密码
const password = 'password123';

// 使用 bcrypt 加密密码
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log(hash);  // 打印出加密后的密码
});
