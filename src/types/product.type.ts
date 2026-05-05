export type ProductType = {
    id: number,
    categoryId: number,
    name: string,
    price: number,
    icon: string,
}

export type ProductCategoryType = {
    id?: number,
    name: string,
    icon?: string,
}

export type ProductCategoryFileType = {
    name: string,
    icon: File | null,
}
