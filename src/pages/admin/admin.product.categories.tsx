import './Admin.css'
import {Header} from "@/pages/admin/components/Header";
import {useEffect, useState} from "react";
import {ProductCategoryType, ProductType} from "@/types/product.type";
import {deleteProductCategoryRequest, productsCategoriesRequest, productsRequest} from "@/api/product.api";
import {SquarePen, Trash, X} from "lucide-react";
import {MyModal} from "@/pages/admin/components/MyModal";
import {AddProductCategoryComponent} from "@/pages/admin/components/product/AddProductCategory.component";
import {ConfirmModal} from "@/components/ConfirmModal";


export const AdminProductCategories = () => {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [productId, setProductId] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const [productCategories, setProductCategories] = useState<ProductCategoryType[]>([])

    useEffect(() => {

        void handleGetProductCategories()

    }, [setProductCategories])


    const handleGetProductCategories = async () => {
        const tmpProducts = await productsCategoriesRequest();
        setProductCategories(tmpProducts);
    }

    const handleCLoseModal = () => {
        console.log("handleCLoseModal");
    }


    const removeProductCategory = async () => {
        await deleteProductCategoryRequest(productId);
        setProductId(0);
        setOpen(false);
        void handleGetProductCategories()
    }

    return (
        <div>
            <Header/>
            <div className="admin-wrap">

                <h2 className={"title"}>Product Categories</h2>


                <div className="admin-wrapp-header">
                    <button className={'btn sm btn-green'} onClick={() => {
                        setIsOpenModal(!isOpenModal)
                        setProductId(0);
                    }}>Add
                    </button>
                </div>

                <div className="items-list">
                    {productCategories.map((product: ProductCategoryType) => {
                        return (
                            <div className={"items-list-item"} key={product.id}>
                                <div className={"flex flex-row align-items-center gap-10"}>
                                    <div>
                                        {product.name}
                                    </div>
                                    <div className={'flex align-items-center'}>
                                        <img src={import.meta.env.VITE_API_URL + product?.icon} alt=""
                                             style={{width: '100px'}} className={'thumbnail'}/>
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
                contend={<AddProductCategoryComponent id={productId} cb={() => {
                    void handleGetProductCategories()
                    setIsOpenModal(false)
                }}/>}
            />

            <ConfirmModal
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={removeProductCategory}
            />

        </div>
    )
}