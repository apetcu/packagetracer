const mysql = require('mysql');
const DatabaseConfig = require('../config');

const DB = class Database {
    constructor() {
        this.connection = mysql.createConnection({
            port: DatabaseConfig.port,
            host: DatabaseConfig.host,
            user: DatabaseConfig.user,
            password: DatabaseConfig.pass,
            database: DatabaseConfig.name
        });
        this.connection.connect();
    }

    query(query = '') {
        return new Promise((resolve, reject) => {
            this.connection.query(query, function (error, results, fields) {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                console.debug("[RUN QUERY] ", query);
                resolve(results);
            });
        });
    }

    getAll(table) {
        return new Promise((resolve, reject) => {
            this.query("SELECT * from " + table).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            })
        });
    }

    select(table, conditions) {
        return new Promise((resolve, reject) => {
            this.query("SELECT * from " + table + " where (1=1 AND " + (this.parseConditions(conditions).join(' AND ')) + ")").then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            })
        });
    }

    parseConditions(conditions) {
        let conds = [];
        for (let i in conditions) {
            conds.push(i + "='" + conditions[i] + "'");
        }
        return conds;
    }

    insert(table, info) {
        return new Promise((resolve, reject) => {
            console.log("RUNNING QUERY", "INSERT INTO " + table + "(" + Object.keys(info).join(',') + ") values (" + Object.values(info).join(',') + ") ");
            this.query("INSERT INTO " + table + "(" + Object.keys(info).join(',') + ") values ('" + Object.values(info).join("','") + "') ").then((data) => {
                resolve(data.insertId);
            }, (error) => {
                reject(error);
            })
        });
    }

    getRow(table, conditions) {
        return new Promise((resolve, reject) => {
            this.query("SELECT * from " + table + " where (1=1 AND " + (this.parseConditions(conditions).join(' AND ')) + ")").then((data) => {
                resolve(data[0]);
            }, (error) => {
                reject(error);
            })
        });
    }

    updateRow(table, conditions, data) {
        return new Promise((resolve, reject) => {
            this.query("UPDATE " + table + " set " + (this.parseConditions(data).join(' , ')) + " where (1=1 AND " + (this.parseConditions(conditions).join(' AND ')) + ")").then((data) => {
                resolve(data[0]);
            }, (error) => {
                reject(error);
            })
        });
    }

    deleteRow(table, conditions) {
        return new Promise((resolve, reject) => {
            this.query("DELETE from " + table + " where (1=1 AND " + (this.parseConditions(conditions).join(' AND ')) + ")").then((data) => {
                resolve(data[0]);
            }, (error) => {
                reject(error);
            })
        });
    }
};

var DBInstance = new DB();

module.exports = DBInstance;

