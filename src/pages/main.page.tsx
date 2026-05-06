import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import WorldMap, {DataItem} from "react-svg-worldmap";
import {usersByCountry} from "@/api/main.api";
import {PageLoading} from "@/components/partial/PageLoading";
import {CirclePlus, Rose, Sprout, Tractor, Wheat} from "lucide-react";
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

                <div className={"action-item shadow-lg color-blue farm"}>
                    <div className={"action-item-inner"}>
                        <div className={'action-item-icon'}>
                            <Tractor size={28}/>
                        </div>
                        <div className={'action-item-text-info'}>
                            <h3>
                                Farm supervisor
                            </h3>
                        </div>
                        <div className={'earnings'}>
                            Earnings <span>🪙10</span>
                        </div>

                    </div>
                    <div className={"action-item-graph-info"}>
                        <div className={"graph-info-graph"}>
                            <div className="graph-info-graph-progress" style={{width: '80%'}}></div>
                        </div>
                        <div className={"graph-info-text"}>80%</div>
                    </div>
                </div>

                <div className={"action-item shadow-lg color-blue wheat"}>
                    <div className={"action-item-inner"}>
                        <div className={'action-item-icon'}>
                            <Wheat size={28}/>
                        </div>
                        <div className={'action-item-text-info'}>
                            <h3>
                                Wheat germination
                            </h3>
                        </div>
                        <div className={'earnings'}>
                            Earnings <span>🪙5</span>
                        </div>

                    </div>
                    <div className={"action-item-graph-info"}>
                        <div className={"graph-info-graph"}>
                            <div className="graph-info-graph-progress" style={{width: '55%'}}></div>
                        </div>
                        <div className={"graph-info-text"}>55% Completed</div>
                    </div>
                </div>

                <div className={"action-item-2-col"}>

                    <div className={"action-item shadow-lg color-blue plant"}>
                        <div className={"action-item-inner"}>
                            <div className={'action-item-icon'}>
                                <Sprout size={28}/>

                            </div>
                            <div className={'action-item-text-info'}>
                                <h3>
                                    Farm supervisor
                                </h3>
                            </div>
                            <div className={'earnings'}>
                                Earnings <span>🪙10</span>
                            </div>

                        </div>
                        <div className={"action-item-graph-info"}>
                            <div className={"graph-info-graph"}>
                                <div className="graph-info-graph-progress" style={{width: '80%'}}></div>
                            </div>
                            <div className={"graph-info-text"}>80%</div>
                        </div>
                    </div>

                    <div className={"action-item shadow-lg color-blue flower"}>
                        <div className={"action-item-inner"}>
                            <div className={'action-item-icon'}>
                                <Rose size={28}/>

                            </div>
                            <div className={'action-item-text-info'}>
                                <h3>
                                    Farm supervisor
                                </h3>
                            </div>
                            <div className={'earnings'}>
                                Earnings <span>🪙10</span>
                            </div>

                        </div>
                        <div className={"action-item-graph-info"}>
                            <div className={"graph-info-graph"}>
                                <div className="graph-info-graph-progress" style={{width: '80%'}}></div>
                            </div>
                            <div className={"graph-info-text"}>80%</div>
                        </div>
                    </div>

                </div>


                <div className={"action-item-2-col"}>

                    <div className={"action-item shadow-lg color-blue farm"}>
                        <div className={"action-item-inner"}>
                            <div className={'action-item-icon'}>
                                <Tractor size={28}/>
                            </div>
                            <div className={'action-item-text-info'}>
                                <h3>
                                    Farm supervisor
                                </h3>
                            </div>
                            <div className={'earnings'}>
                                Earnings <span>🪙10</span>
                            </div>

                        </div>
                        <div className={"action-item-graph-info"}>
                            <div className={"graph-info-graph"}>
                                <div className="graph-info-graph-progress" style={{width: '80%'}}></div>
                            </div>
                            <div className={"graph-info-text"}>80%</div>
                        </div>
                    </div>

                    <div className={"action-item shadow-lg color-blue empty-slot"}>
                        <div>
                            <CirclePlus size={42}/>
                            <span>Empty slot</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
