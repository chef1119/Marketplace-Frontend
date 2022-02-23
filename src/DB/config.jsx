require('dotenv').config();
import { MYSQL_CONNECTION_LIMIT,MYSQL_HOST, MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE,MYSQL_PORT } from "./constant";

export const mysql = {
    connectionLimit: MYSQL_CONNECTION_LIMIT,
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
    multipleStatements: true,
};
console.log(mysql);

export default {mysql};