const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tesnsordb',
});

db.connect((err) => {
    if (err) { throw err; }
    console.log('Mysql: Connected');
});

db.dbQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) { reject(new Error()); }
            else { resolve(result); }
        });
    });
};

module.exports = db;