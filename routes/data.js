const express = require('express');
const data = express(); // the sub app
const DBInstance = require('../core/classes/Database');
/**
 * Get parcels list
 */
data.delete('/delete/:item/:rowId', function (req, res) {
    DBInstance.deleteRow(req.params.item, {id: req.params.rowId}, req.body).then((data) => {
        res.send(data);
    }, (error) => {
        res.status(400);
        res.send(error);
    })

});
data.get('/counters', function (req, res) {
    DBInstance.query('select status,count(id) as nr from parcels group by status').then((data) => {
        res.send(data);
    }, (error) => {
        res.status(400);
        res.send(error);
    })
});


module.exports = data;