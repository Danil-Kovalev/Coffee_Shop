import { RowDataPacket } from 'mysql2';
import { db } from './database/db.js';
import { readFile } from 'fs/promises';
import { PATH_SQL } from './constants.js';

/**
 * Get sql request from sql file and return him
 * @param fileName name sql file
 * @param type version database
 * @returns sql request
 */
async function getSqlRequest(fileName: string, type: string): Promise<string> {
    return await readFile(PATH_SQL + '\\' + type + '\\' + fileName + '.sql', 'utf-8')
}

/**
 * Get all cakes from database
 * @returns all cakes from database
 */
export async function getAllCakes(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-cakes', 'cake');

    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

/**
 * Get all drinks from database
 * @returns all drinks from database
 */
export async function getAllDrinks(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-drinks', 'drinks');

    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

/**
 * Get all pastries from database
 * @returns all pastries from database
 */
export async function getAllPastries(): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('get-pastries', 'pastry');

    let result = await db.execute<RowDataPacket[]>(query);
    return result[0];
}

/**
 * Search products by text from user
 * @param text from user for search product
 * @returns products with data by search text
 */
export async function searchProducts(text: string): Promise<RowDataPacket[]> {
    let query = await getSqlRequest('search-product', '')

    text = `%${text}%`;
    let result = await db.execute<RowDataPacket[]>(query, [text, text]);
    return result[0];
}