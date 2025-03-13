import mysql from "mysql2/promise";
import { CONFIG } from "../config/configDB.js";
export const db = await mysql.createConnection(CONFIG);
