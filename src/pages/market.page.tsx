import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'

export const MarketPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }
    }, [user, navigate]);


    return (
        <div className={"market-page-wrap"}>

            <div className="market-wrap">

                <h2>Market</h2>

            </div>


        </div>
    )
}
