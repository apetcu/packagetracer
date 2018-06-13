const express = require('express');
const clients = express(); // the sub app
const DBInstance = require('../core/classes/Database');
const Restify = require('../core/classes/Restify');

const Client = require('../models/Client');
const currentTable = 'clients';

Restify(clients, currentTable);

/**
 * Get parcels list
 */
clients.get('/list', function (req, res) {
    DBInstance.getAll(currentTable).then((data) => {
        res.send(data.map(entry => Client(entry)));
    });
});


module.exports = clients;