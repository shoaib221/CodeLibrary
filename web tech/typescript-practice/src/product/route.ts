import type { IncomingMessage, ServerResponse } from "http";
import { deleteProduct, insertProduct, parseBody, readProducts, sendresponse, updateProduct } from "./controller";


export async function handleProductRoute(req: IncomingMessage, res: ServerResponse) {
    let url = req.url?.substring(8) || "";
    let method = req.method || "GET";


    if (url === "" && req.method === "GET") 
    {
        const products = await readProducts();
        return sendresponse({
            res,
            statusCode: 200,
            success: true,
            message: "List of products",
            data: { products }
        });
    } 
    else if (url === "" && req.method === "POST") 
    {
        const body = await parseBody(req);
        const newProduct = await insertProduct(body);

        return sendresponse({
            res,
            statusCode: 201,
            success: true,
            message: "Product created",
            data: { product: newProduct }
        });
    } 
    else if (url.startsWith("/") && req.method === "GET") 
    {
        const products = await readProducts();
        let id = url.substring(1);
        let product = products.find((p: any) => p.id === id);
        
        return sendresponse({
            res,
            statusCode: 200,
            success: true,
            message: "Product found",
            data: { product }
        });
    }
    else if (url.startsWith("/") && req.method === "DELETE")
    {
        let id = url.substring(1);
        await deleteProduct(id);
        return sendresponse({
            res,
            statusCode: 200,
            success: true,
            message: "Product deleted"
        });
    }
    else if ( url === "" && req.method === "PUT") 
    {
        const body = await parseBody(req);
        let product = await updateProduct(body);
        return sendresponse({
            res,
            statusCode: 200,
            success: true,
            message: "Product updated",
            data: { product }
        });
    }
    else 
    {
        return sendresponse({
            res,
            statusCode: 404,
            success: false,
            message: "Not Found"
        });
    }



}