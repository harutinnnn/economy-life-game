import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import WorldMap, {DataItem} from "react-svg-worldmap";
import {usersByCountry} from "@/api/main.api";

export const MainPage = () => {


    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const [mapCountryData, setMapCountryData] = useState<DataItem[]>([]);


    const navigate = useNavigate();

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }


        (async () => {
            const countryData = await usersByCountry();
            console.log(countryData);
            setMapCountryData(countryData)
            setLoading(false);
        })()

    }, [user, navigate]);


    if(loading){
        return <div>Loading...</div>;
    }

    return (
        <div className={"main-page-wrap"}>

            <div className={"world-map-container shadow-lg"}>
                <div className={"world-map"}>
                    <WorldMap
                        color="#004B73"
                        valueSuffix="Users"
                        data={mapCountryData}
                    />
                </div>
            </div>
        </div>
    )
}
