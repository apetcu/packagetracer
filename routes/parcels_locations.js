const express = require('express');
const parcels_locations = express(); // the sub app
const DBInstance = require('../core/classes/Database');
const Restify = require('../core/classes/Restify');

const ParcelLocation = require('../models/Parcel_Location');
const currentTable = 'parcel_locations';

Restify(parcels_locations, currentTable);

/**
 * Get parcels_locations list
 */
parcels_locations.get('/list', function (req, res) {
    DBInstance.getAll(currentTable).then((data) => {
        res.send(data.map(entry => ParcelLocation(entry)));
    });
});


module.exports = parcels_locations;