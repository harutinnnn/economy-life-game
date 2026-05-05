import api from "./axios";
import {ProductCategoryType, ProductType} from "@/types/product.type";
import {LoginResponse, RegisterPayload} from "@/api/auth.api";

export type ProductsResponse = {
    products: ProductType[]
}


export async function productsRequest(): Promise<ProductType[]> {
    const response = await api.get<ProductsResponse>("/products");
    return response.data.products;
}


export type ProductsCategoriesResponse = {
    productsCategories: ProductCategoryType[]
}
export type ProductsCategoryResponse = {
    productCategory: ProductCategoryType
}


export async function productsCategoriesRequest(): Promise<ProductCategoryType[]> {
    const response = await api.get<ProductsCategoriesResponse>("/products/product-categories");
    return response.data.productsCategories;
}

export async function productsCategoryRequest(id: number): Promise<ProductCategoryType> {
    const response = await api.get<ProductsCategoryResponse>(`/products/product-category/${id}`);
    return response.data.productCategory;
}

export async function saveProductCategoryRequest(
    data: FormData
): Promise<ProductCategoryType> {
    const response = await api.post<ProductCategoryType>("/products/edit", data,
        {
            headers: {"Content-Type": "multipart/form-data"}
        }
    );
    return response.data;
}

export async function deleteProductCategoryRequest(
    id: number
): Promise<boolean> {
    const response = await api.delete<boolean>(`/products/delete/${id}`);
    return response.data;
}