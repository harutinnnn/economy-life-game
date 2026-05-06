import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import WorldMap, {DataItem} from "react-svg-worldmap";
import {usersByCountry} from "@/api/main.api";
import {PageLoading} from "@/components/partial/PageLoading";

export const MapCountryUsers = () => {


    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const [mapCountryData, setMapCountryData] = useState<DataItem[]>([]);


    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            const countryData = await usersByCountry();
            setMapCountryData(countryData)
            setLoading(false);
        })()

    }, [user, navigate]);


    if (loading) {
        return <PageLoading/>;
    }

    return (
        <div className={"world-map-container shadow-lg"}>
            <div className={"world-map"}>
                <WorldMap
                    color="#004B73"
                    valueSuffix="Users"
                    data={mapCountryData}
                />
            </div>
        </div>
    )
}
