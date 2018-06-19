const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const parcels = require('./routes/parcels'); // the sub app
const parcels_locations = require('./routes/parcels_locations'); // the sub app
const locations = require('./routes/locations'); // the sub app
const clients = require('./routes/clients'); // the sub app
const data = require('./routes/data'); // the sub app
const users = require('./routes/users'); // the sub app

const app = express(); // the main app

app.use(cors());
app.use(bodyParser.json());

app.use('/parcels', parcels); // mount the sub app
app.use('/parcels_locations', parcels_locations); // mount the sub app
app.use('/locations', locations); // mount the sub app
app.use('/clients', clients); // mount the sub app
app.use('/users', users); // mount the sub app
app.use('/data', data); // mount the sub app

app.listen(8080, () => console.log('Example app listening on port 8080!'))