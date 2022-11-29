const mysql = require('mysql')

// Create a connection to the database
const database = mysql.createPool({
  host: 'lab3-music.c3yxv5zktgur.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: '88888888',
  database: 'lab3_music',
  multipleStatements: true,
  //Character encoding format
    charset: 'utf8mb4'
})

// 向外共享 db 数据库连接对象
module.exports = database