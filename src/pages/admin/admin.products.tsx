import './Admin.css'
import {Header} from "@/pages/admin/components/Header";
import {useEffect, useState} from "react";
import {ProductCategoryType, ProductType} from "@/types/product.type";
import {
    deleteProductRequest,
    productsCategoriesRequest,
    productsRequest
} from "@/api/product.api";
import {SquarePen, Trash} from "lucide-react";
import {MyModal} from "@/pages/admin/components/MyModal";
import {ConfirmModal} from "@/components/ConfirmModal";
import {AddProductComponent} from "@/pages/admin/components/product/AddProduct.component";

export const AdminProducts = () => {

    const [products, setProducts] = useState<ProductType[]>([])
    const [categories, setCategories] = useState<ProductCategoryType[]>([])

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [productId, setProductId] = useState<number>(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        (async () => {
            await handleGetProductCategoriesAndProducts()

        })()

    }, [setProducts, setCategories])

    const handleGetProductCategoriesAndProducts = async (): Promise<void> => {
        const productsCategories = await productsCategoriesRequest();
        setCategories(productsCategories);

        const tmpProducts = await productsRequest();
        setProducts(tmpProducts);
    }

    const handleCLoseModal = () => {
        console.log("handleCLoseModal");
    }

    const removeProduct = async () => {
        await deleteProductRequest(productId);
        setProductId(0);
        setOpen(false);
        void handleGetProductCategoriesAndProducts()
    }


    return (
        <div>
            <Header/>
            <div className="admin-wrap">

                <h2 className={'title'}>Products</h2>

                <div className="admin-wrapp-header">
                    <button className={'btn sm btn-green'} onClick={() => {
                        setIsOpenModal(!isOpenModal)
                        setProductId(0);
                    }}>Add
                    </button>
                </div>

                <div className="items-list">
                    {products.map((product: ProductType) => {
                        return (
                            <div className={"items-list-item"} key={product.id}>
                                <div className={"flex flex-row align-items-center gap-10 list-item"}>
                                    <div>
                                        <div>
                                            Name: {product.name}
                                        </div>
                                        <div>

                                            Category: {categories.find(cat => cat.id === product.categoryId)?.name || ""}
                                        </div>
                                        <div>

                                            price: {product.price}
                                        </div>
                                    </div>
                                    <div className={'flex align-items-center'}>
                                        <img src={import.meta.env.VITE_API_URL + product?.icon} alt=""
                                             style={{width: '50px'}} className={'thumbnail'}/>
                                    </div>
                                </div>

                                <div className={'actions'}>
                                    <SquarePen size={22} onClick={() => {
                                        setProductId(product?.id || 0)
                                        setIsOpenModal(true)
                                    }}/>

                                    <Trash size={22} className={"delete"} onClick={() => {
                                        setProductId(product?.id || 0)
                                        setOpen(true);
                                    }}/>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>

            <MyModal
                afterOpen={() => {
                    handleCLoseModal();
                }} openModal={isOpenModal}
                closedModal={() => setIsOpenModal(false)}
                contend={<AddProductComponent id={productId} cb={() => {
                    void handleGetProductCategoriesAndProducts()
                    setIsOpenModal(false)
                }} categories={categories}/>}
            />

            <ConfirmModal
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={removeProduct}
            />

        </div>
    )
}