import api from "./axios";
import {ProductType} from "@/types/product.type";

export type ProductsResponse = {
    products: ProductType[]
}


export async function productsRequest(): Promise<ProductType[]> {
    const response = await api.get<ProductsResponse>("/products");
    return response.data.products;
}
