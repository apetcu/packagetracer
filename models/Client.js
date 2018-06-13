var Model = require('./Model');

var Person = {
	id: "",
 	name: "",
 	address: "",
	phone: "",
	email: "",
	sex: "",
	age: "",
    dateOfBirth: "",
 	city: "",
 	county: "",
 	country: "",
 	postalCode: ""
};

module.exports = (entry) => Model(Person, entry);



