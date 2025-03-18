import express, { Request, Response } from 'express';
import { getAllCakes, getAllDrinks, getAllPastries, searchProducts } from "./scripts.js";
import { Product } from "./pattern/pattern.js";

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestCakes(req: Request, res: Response) {
    let result;
    result = await getAllCakes();

    let products: Product[] = result.map((data: any) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    })

    res.send(products);
}

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestDrinks(req: Request, res: Response) {
    let result;
    result = await getAllDrinks();

    let products: Product[] = result.map((data: any) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    })

    res.send(products);
}

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestPastries(req: Request, res: Response) {
    let result;
    result = await getAllPastries();

    let products: Product[] = result.map((data: any) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    })

    res.send(products);
}

export async function requestSearchProducts(req: Request, res: Response) {
    let result = await searchProducts(req.body);

    let products: Product[] = result.map((data: any) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    })

    res.send(products);
}