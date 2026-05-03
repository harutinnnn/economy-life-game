import './Admin.css'
import {Header} from "@/pages/admin/components/Header";
import {useEffect, useState} from "react";
import {ProductType} from "@/types/product.type";
import {productsRequest} from "@/api/product.api";
import {SquarePen} from "lucide-react";

export const AdminProducts = () => {

    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {

        (async () => {
            const tmpProducts = await productsRequest();
            setProducts(tmpProducts);
        })()

    }, [setProducts])

    return (
        <div>
            <Header/>
            <div className="admin-wrap">

                <h2>Products</h2>

                <div className="admin-wrapp-header">
                    <button className={'btn sm btn-green'}>Add</button>
                </div>

                <div className="items-list">
                    {products.map((product: ProductType) => {
                        return (
                            <>
                                <div className={"items-list-item"}>
                                    <div>
                                        {product.name}
                                    </div>
                                    <div className={'actions'}>
                                        <SquarePen size={22}/>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}