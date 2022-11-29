const mysql = require('mysql')

// 创建数据库连接对象
const database = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '00000000',
  database: 'lab4',
  multipleStatements: true,
  //Character encoding format
    charset: 'utf8mb4'
})

// 向外共享 db 数据库连接对象
module.exports = database