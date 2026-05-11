import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import {productsGroupByRequest, productsRequest} from "@/api/product.api";
import {ProductCategoryGroupType, ProductType} from "@/types/product.type";

export const MarketPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();


    const [products, setProducts] = useState<ProductCategoryGroupType[]>([]);

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }

        (async () => {
            await getProductsList()
        })()


    }, [user, navigate]);


    const getProductsList = async () => {
        const data: ProductCategoryGroupType[] = await productsGroupByRequest()
        setProducts(data);
    }


    return (
        <div className={"market-page-wrap"}>

            <div className="market-wrap full-height">

                <h2>Market</h2>


                <div className={"market-products-list"}>

                    {products.map(prod => {
                        return (
                            <div className={"product-item"} key={prod.products.id}>
                                <h6>{prod.productsCategories.name}</h6>
                                <h4>{prod.products.name}</h4>
                                <img src={import.meta.env.VITE_API_URL + prod.products.icon} alt=""/>
                                <div>Price: {prod.products.price}</div>
                            </div>
                        )
                    })}

                </div>

            </div>


        </div>
    )
}
