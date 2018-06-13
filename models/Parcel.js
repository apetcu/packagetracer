var Model = require('./Model');
var Client = require('./Client');

var DefaultKeys = {
    id: "",
    trackingID: "",
    sender: Client(),
    receiver: Client(),
    weight: "",
    priority: false,
    status: 0
};

module.exports = (entry) => Model(DefaultKeys, entry);



