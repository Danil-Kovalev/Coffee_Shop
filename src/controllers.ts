import { getAllCakes, getAllDrinks, getAllPastries } from "./scripts.js";
import { Data } from "./pattern/pattern.js";

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
async function requestCakes(req: Request): Promise<Data> {
    let result;
    let data: Data = { id: 0, name: '', price: 0, availability: 0 };

    result = await getAllCakes();

    data.id = result.id;
    data.name = result.name;
    data.price = result.price;
    data.availability = result.avalability;

    return data;
}

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
async function requestDrinks(req: Request): Promise<Data> {
    let result;
    let data: Data = { id: 0, name: '', price: 0, availability: 0 };

    result = await getAllDrinks();

    data.id = result.id;
    data.name = result.name;
    data.price = result.price;
    data.availability = result.avalability;

    return data;
}

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
async function requestPastries(req: Request): Promise<Data> {
    let result;
    let data: Data = { id: 0, name: '', price: 0, availability: 0 };

    result = await getAllPastries();

    data.id = result.id;
    data.name = result.name;
    data.price = result.price;
    data.availability = result.avalability;

    return data;
}