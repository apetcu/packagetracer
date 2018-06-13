const DBInstance = require('./Database');

module.exports = (Item, currentTable) => {
    /**
     * List all rows
     */
   /* Item.get('/list', function (req, res) {
        DBInstance.getAll(currentTable).then((data) => {
            res.send(data);
        });
    });*/

    /**
     * Add new row
     */
    Item.post('/add', function (req, res) {
        DBInstance.insert(currentTable, req.body).then(() => {
            res.sendStatus(200);
        }, (error) => {
            res.status(400);
            res.send(error);
        })
    });
    /**
     * Get row by id
     */
    Item.get('/id/:rowId', function (req, res) {
        DBInstance.getRow(currentTable, {id: req.params.rowId}).then((data) => {
            res.send(data);
        }, (error) => {
            res.status(400);
            res.send(error);
        })
    });

    /**
     * Update row
     */
    Item.put('/id/:rowId', function (req, res) {
        DBInstance.updateRow(currentTable, {id: req.params.rowId}, req.body).then((data) => {
            res.send(data);
        }, (error) => {
            res.status(400);
            res.send(error);
        })
    });

    /**
     * Delete row
     */
    Item.delete('/id/:rowId', function (req, res) {
        DBInstance.deleteRow(currentTable, {id: req.params.rowId}, req.body).then((data) => {
            res.send(data);
        }, (error) => {
            res.status(400);
            res.send(error);
        })
    });

}