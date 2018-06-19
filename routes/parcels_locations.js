const express = require('express');
const parcels_locations = express(); // the sub app
const DBInstance = require('../core/classes/Database');
const Restify = require('../core/classes/Restify');

const ParcelLocation = require('../models/Parcel_Location');
const currentTable = 'parcel_locations';

Restify(parcels_locations, currentTable);

/**
 * Get parcels list
 */
parcels_locations.get('/list', function (req, res) {
    DBInstance.query("SELECT " + currentTable + ".id, " + currentTable + ".parcel, locations.name as location, " + currentTable + ".status, users.name as user, " + currentTable + ".date FROM " + currentTable + " " +
        " inner join locations on " + currentTable + ".location=locations.id" +
        " inner join users on users.id=" + currentTable + ".user WHERE " + currentTable + ".parcel='" + req.query.parcel + "'").then((data) => {
        res.send(data.map(entry => ParcelLocation(entry)));
    });
});

/**
 * Get parcels list
 */
parcels_locations.get('/listID', function (req, res) {
    DBInstance.select(currentTable, {parcel: req.query.parcel}).then((data) => {
        res.send(data.map(entry => ParcelLocation(entry)));
    });
});


module.exports = parcels_locations;