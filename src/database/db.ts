import mysql, { Connection } from "mysql2/promise";
import { CONFIG } from "../config/configDB.js";

export const db: Connection = await mysql.createConnection(CONFIG);