import api from "./axios";
import {ProductCategoryGroupType, ProductCategoryType, ProductType} from "@/types/product.type";
import {LoginResponse, RegisterPayload} from "@/api/auth.api";

export type ProductsResponse = {
    products: ProductType[]
}
export type ProductResponse = {
    product: ProductType
}
export type ProductsCategoryGroupResponse = {
    products: ProductCategoryGroupType[]
}


export async function productsRequest(): Promise<ProductType[]> {
    const response = await api.get<ProductsResponse>("/products");
    return response.data.products;
}
export async function productsGroupByRequest(): Promise<ProductCategoryGroupType[]> {
    const response = await api.get<ProductsCategoryGroupResponse>("/products/goup-by");
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
    const response = await api.post<ProductCategoryType>("/products/edit-category", data,
        {
            headers: {"Content-Type": "multipart/form-data"}
        }
    );
    return response.data;
}

export async function deleteProductCategoryRequest(
    id: number
): Promise<boolean> {
    const response = await api.delete<boolean>(`/products/delete-category/${id}`);
    return response.data;
}


export async function productRequest(id: number): Promise<ProductType> {
    const response = await api.get<ProductResponse>(`/products/product/${id}`);
    return response.data.product;
}

export async function saveProductRequest(
    data: FormData
): Promise<ProductType> {
    const response = await api.post<ProductType>("/products/edit", data,
        {
            headers: {"Content-Type": "multipart/form-data"}
        }
    );
    return response.data;
}


export async function deleteProductRequest(
    id: number
): Promise<boolean> {
    const response = await api.delete<boolean>(`/products/delete/${id}`);
    return response.data;
}