const { parse } = require('json2csv');

exports.downloadResource = async function (res, fileName, fields, data) {
    try {
        //console.log(data);
        const csv = parse(data, {fields});
        res.header('Content-Type', 'text/csv');
        res.attachment(fileName);
        return res.send(csv);
    } catch(err) {
        console.error(err);
        return;
    }
};