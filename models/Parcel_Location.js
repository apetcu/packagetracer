var Model = require('./Model');

var DefaultKeys = {
    id: "",
    location: "",
    user: "",
    date: "",
    status: ""
};

module.exports = (entry) => Model(DefaultKeys, entry);



