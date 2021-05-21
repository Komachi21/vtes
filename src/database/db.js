const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'facebook'
})

connection.connect(function (err, connection) {
  if (err) console.log(err)
  console.log('Ket noi thanh cong')
})

module.exports = connection