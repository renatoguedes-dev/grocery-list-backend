import dotenv from "dotenv";
import pgPromise from "pg-promise";

dotenv.config();

const pgp = pgPromise({});
const db = pgp({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
});

export default db;
