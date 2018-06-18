const express = require('express');
const md5 = require('md5');
const users = express(); // the sub app
const DBInstance = require('../core/classes/Database');
const Restify = require('../core/classes/Restify');

const User = require('../models/User');
const currentTable = 'users';

Restify(users, currentTable);

/**
 * Get parcels list
 */
users.get('/list', function (req, res) {
    DBInstance.getAll(currentTable).then((data) => {
        res.send(data.map(entry => User(entry)));
    });
});

/**
 * Get parcels list
 */
users.get('/create', function (req, res) {
    req.body.password = md5(req.body.password);

    DBInstance.insert(currentTable, req.body).then(() => {
        res.sendStatus(200);
    }, (error) => {
        res.status(400);
        res.send(error);
    })
});

/**
 * Get parcels list
 */
users.post('/login', function (req, res) {
    DBInstance.select(currentTable, {
        username: req.body.username,
        password: md5(req.body.password)
    }).then((data) => {
        if (data.length) {
            res.send(data[0]);
        } else {
            res.status(401);
            res.send("Invalid credentials");
        }
    });
});


module.exports = users;