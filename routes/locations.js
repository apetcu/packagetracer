const express = require('express');
const clients = express(); // the sub app
const DBInstance = require('../core/classes/Database');
const Restify = require('../core/classes/Restify');

const Location = require('../models/Location');
const currentTable = 'locations';

Restify(clients, currentTable);

/**
 * Get parcels list
 */
clients.get('/list', function (req, res) {
    console.log(req.query)
    DBInstance.select(currentTable, {type: req.query.type}).then((data) => {
        res.send(data.map(entry => Location(entry)));
    });
});


module.exports = clients;