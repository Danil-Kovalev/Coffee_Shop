import express, { Request, Response } from 'express';
import { getAllCakes, getAllDrinks, getAllPastries, searchProducts } from "./scripts.js";
import { Product } from "./pattern/pattern.js";
import { DEFAULT_FILTER, DEFAULT_OFFSET } from './constants.js';

/**
 * Get books by parameters after preprocessing them
 * @param req parameters from client
 * @returns the result of successful execution
 */
export async function requestProducts(req: Request, res: Response) {
    let result;
    let convertedOffset: number = convertOffset(Number(req.query.offset));
    let convertedFilter: string = convertFilter(String(req.query.filter));

    if (convertedFilter === 'menu-cakes') {
        result = await getAllCakes();
    }
    else if (convertedFilter === 'menu-drinks') {
        result = await getAllDrinks();
    }
    else {
        result = await getAllPastries();
    }

    let products: Product[] = result.map((data: any) => {
        return {
            id: data.id,
            name: data.name,
            price: data.price,
            availability: data.availability,
            type: data.type
        };
    })

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
function convertOffset(valueReqData: number): number {
    return valueReqData === undefined ? DEFAULT_OFFSET : Number(valueReqData);
}

/**
 * Check filter value and return default or number value
 * @param valueReqData value filter from client
 * @returns default filter value or convert value to number
 */
function convertFilter(valueReqData: string): string {
    return valueReqData === undefined ? DEFAULT_FILTER : String(valueReqData);
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