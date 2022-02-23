import dbConnection from "./dbconnection";

const db = {};

db.query = (q, data) => {
    return new Promise((resolve, reject) => {
        dbConnection.query(q, data, (err, res) => {
        err ? reject(err) : resolve(res);
        });
    });
};

export default db;