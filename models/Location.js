var Model = require('./Model');

var Location = {
    id: "",
    name: "",
    address: "",
    schedule: "",
    lat: "",
    lon: "",
    type: ""
};

module.exports = (entry) => Model(Location, entry);



