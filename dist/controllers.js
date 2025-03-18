import { getAllCakes, getAllDrinks, getAllPastries, searchProducts } from "./scripts.js";
/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestCakes(req, res) {
    let result;
    result = await getAllCakes();
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
/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestDrinks(req, res) {
    let result;
    result = await getAllDrinks();
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
/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestPastries(req, res) {
    let result;
    result = await getAllPastries();
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
