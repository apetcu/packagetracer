var Model = require('./Model');

var User = {
    id: "",
    name: "",
    username: "",
    password: "",
    location: ""
};

module.exports = (entry) => Model(User, entry);