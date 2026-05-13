import {ProductTypesEnum} from "@/enums/ProductTypesEnum";

export type ProductType = {
    id?: number,
    categoryId: number,
    productType: ProductTypesEnum,
    name: string,
    price: number,
    icon: string,
}

export type ProductCategoryType = {
    id?: number,
    name: string,
    icon?: string,
}

export type ProductCategoryGroupType = {
    products: ProductType,
    productsCategories: ProductCategoryType,
}

export type ProductCategoryFileType = {
    name: string,
    icon: File | null,
}


export type ProductFileType = {
    categoryId: number,
    productType: ProductTypesEnum,
    name: string,
    price: number,
    icon: File | null,
}
