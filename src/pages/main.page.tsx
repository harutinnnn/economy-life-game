import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import WorldMap, {DataItem} from "react-svg-worldmap";
import {usersByCountry} from "@/api/main.api";
import {PageLoading} from "@/components/partial/PageLoading";
import {Tractor} from "lucide-react";
import {MapCountryUsers} from "@/components/MapCountryUsersComponent";

export const MainPage = () => {

    const {user} = useAuth();


    const navigate = useNavigate();

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }


    }, [navigate]);


    return (
        <div className={"main-page-wrap"}>

            <div className={'current-actions'}>
                <div className={"action-item shadow-lg color-blue"}>
                    <div className={'action-item-icon'}>
                        <Tractor size={28}/>
                    </div>
                    <div className={'action-item-text-info'}>
                        <h3>
                            Farm process
                        </h3>
                    </div>

                    <div className="action-item-graph-info">
                        <div className={"graph-info-text"}>80%</div>
                        <div className={"graph-info-graph"}>
                            <div className="graph-info-graph-progress" style={{width: '80%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
