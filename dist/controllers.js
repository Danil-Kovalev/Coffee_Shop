import { getAllCakes, getAllDrinks, getAllPastries, searchProducts } from "./scripts.js";
import { DEFAULT_FILTER, DEFAULT_OFFSET } from './constants.js';
/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestProducts(req, res) {
    let result;
    let convertedOffset = convertOffset(Number(req.query.offset));
    let convertedFilter = convertFilter(String(req.query.filter));
    if (convertedFilter === 'menu-cakes') {
        result = await getAllCakes();
    }
    else if (convertedFilter === 'menu-drinks') {
        result = await getAllDrinks();
    }
    else {
        result = await getAllPastries();
    }
    let products = result.map((data) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    });
    res.send({
        data: products.slice(convertedOffset, Number(req.query.limit) + convertedOffset),
        total: products.length,
        filter: convertedFilter,
        offset: convertedOffset,
        success: true
    });
}
/**
 * Check offset value and return default or number value
 * @param valueReqData value offset from client
 * @returns default offset value or convert value to number
 */
function convertOffset(valueReqData) {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}
/**
 * Check filter value and return default or number value
 * @param valueReqData value filter from client
 * @returns default filter value or convert value to number
 */
function convertFilter(valueReqData) {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
}
export async function requestSearchProducts(req, res) {
    let result = await searchProducts(req.body);
    let products = result.map((data) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    });
    res.send(products);
}
