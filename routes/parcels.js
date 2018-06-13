const express = require('express');
const parcels = express(); // the sub app
const DBInstance = require('../core/classes/Database');
const Restify = require('../core/classes/Restify');

const Parcel = require('../models/Parcel');
const currentTable = 'parcels';

Restify(parcels, currentTable);

/**
 * Get parcels list
 */
parcels.get('/list', function (req, res) {
    DBInstance.getAll(currentTable).then((data) => {
        const promises = [];
        data.forEach((entry) => {
            const currentPromise = DBInstance.getRow('clients', {id: entry.sender}).then((sender) => {
                return DBInstance.getRow('clients', {id: entry.receiver}).then((receiver) => {
                    return Parcel(Object.assign(entry, {sender}, {receiver}));
                })
            });
            promises.push(currentPromise);
        });
        Promise.all(promises).then((data) => {
            res.send(data);
        });
    });
});


module.exports = parcels;