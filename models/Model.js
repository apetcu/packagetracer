module.exports = function(defaultKeys, entry){
	const defaultItems = {
		id: ""
	};

	return Object.assign(defaultItems, defaultKeys, entry);
}