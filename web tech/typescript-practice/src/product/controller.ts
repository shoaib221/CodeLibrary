import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs";


export function parseBody (req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const parsed = JSON.parse(body);
                resolve(parsed);
            } catch (err) {
                reject(err);
            }
        });
        req.on("error", err => {
            reject(err);
        });
    });
}

const dbPath = path.join(process.cwd(), "./db/db.json");

export function readProducts (): Promise<any> {
    const products = fs.readFileSync(dbPath, "utf-8");
    return Promise.resolve(JSON.parse(products));
}


export function insertProduct (product: any): Promise<void> {
    const products = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    const newProduct = { id: Date.now().toString(), ...product };
    products.push(newProduct);
    fs.writeFileSync(dbPath, JSON.stringify(products, null, 4));
    return Promise.resolve(newProduct);
}

export function updateProduct ( updatedData: any): Promise<void> {
    const products = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    const index = products.findIndex((p: any) => p.id === updatedData.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        fs.writeFileSync(dbPath, JSON.stringify(products, null, 4));
    }
    return Promise.resolve();
}

export function deleteProduct (id: string): Promise<void> {
    const products = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    const filteredProducts = products.filter((p: any) => p.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(filteredProducts, null, 4));
    return Promise.resolve();
}


export function sendresponse ({res, statusCode, success, message, data}: { res: ServerResponse, statusCode: number, success: boolean, message?: string, data?: any }) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success, message, data }));
}
