const mysql_con = require('../config/database_mysql');
const confS = require('../config/constants');
const axios = require('axios');
const uFunc = require('../utilities/utils.js');


exports.index = async (req, res, next) => {
    try {
        let query = "SELECT * FROM tbl_user_master";
        let queryRes = await mysql_con.dbQuery(query);
        res.json({ status: 'success', data: queryRes });
    } catch (err) {
        console.log(err);
        return next();
    }
}


exports.fetchUserList = async (req, res, next) => {
    try {
        const userList = await axios({
            method: 'get',
            url: confS.API_DOMAIN + confS.LIST_USER_ENDPOINT,
            headers: {'Authorization': 'Bearer '+confS.AUTH_KEY},
            timeout : 3000
        });

        var query = `INSERT INTO tbl_user_master (id, name, email, gender, status, created_at, updated_at) VALUES `;
        for (const key in userList.data.data) { 
            let row_user = userList.data.data[key];
            query += `('${row_user.id}', '${row_user.name}', '${row_user.email}', '${row_user.gender}', '${row_user.status}', '${row_user.created_at}', '${row_user.updated_at}')`;
            if(key != userList.data.data.length -1) {
                query += ',';
            }
        }

        const queryRes = await mysql_con.dbQuery(query);

        if(queryRes.affectedRows) {
            res.json({ status: 'success', data: 'Total users added = ' + queryRes.affectedRows });
        } else {
            throw new Error('DB Error');
        }
    } catch (err) {
        console.log(err);
        return next();
    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const sel_user_id = req.params.id;
        const query = `UPDATE tbl_user_master SET name = '${req.body.name}', email = '${req.body.email}', gender = '${req.body.gender}', 
                        status = '${req.body.status}', updated_at = current_timestamp() WHERE id = ${sel_user_id};`;
        console.log(query);
        const queryRes = await mysql_con.dbQuery(query);

        if(queryRes.changedRows) {
            res.json({ status: 'success', data: 'Data updated for id =' + sel_user_id });
        } else {
            throw new Error('No match found');
        }
    } catch (err) {
        console.log(err);
        return next();
    }
}


exports.downloadAsCSV = async (req, res, next) => {
    try {
        const fields = [
            {label: 'ID', value: 'id'},
            {label: 'NAME', value: 'name'},
            {label: 'EMAIL', value: 'email'},
            {label: 'GENDER', value: 'gender'},
            {label: 'STATUS', value: 'status'},
            {label: 'CREATED DATETIME', value: 'created_at'},
            {label: 'UPDATED DATETIME', value: 'updated_at'},
        ];
        const query = "SELECT * FROM tbl_user_master";
        const queryRes = await mysql_con.dbQuery(query);
        
        return await uFunc.downloadResource(res, 'users.csv', fields, queryRes);
    } catch (err) {
        console.log(err);
        return next();
    }
}


