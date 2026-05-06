import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {Tooltip} from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import {BriefcaseBusiness, Tractor} from "lucide-react";

type Marker = {
    id: number;
    title: string;
    x: number;
    y: number;
    regionIcon: string;
};

export const MainPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }
    }, [user, navigate]);


    return (
        <div className={"main-page-wrap"}>

            <div className={'current-actions'}>

                <h3 className="m-b-1 title">Current action</h3>

                <div className={"action-item shadow-lg color-blue"}>
                    <div className={'action-item-icon'}>
                        <BriefcaseBusiness size={28}/>
                    </div>
                    <div className={'action-item-text-info'}>
                        <h3>
                            Daily Goal
                        </h3>
                        <span>Earn $200 at the Job Center</span>
                    </div>

                    <div className="action-item-graph-info">
                        <div className={"graph-info-text"}>15%</div>
                        <div className={"graph-info-graph"}>
                            <div className="graph-info-graph-progress" style={{width: '15%'}}></div>
                        </div>
                    </div>
                </div>

                <div className={"action-item shadow-lg color-blue"}>
                    <div className={'action-item-icon'}>
                        <BriefcaseBusiness size={28}/>
                    </div>
                    <div className={'action-item-text-info'}>
                        <h3>
                            Daily Work process
                        </h3>
                        <span>Earn $20 at the end of job</span>
                    </div>

                    <div className="action-item-graph-info">
                        <div className={"graph-info-text"}>37%</div>
                        <div className={"graph-info-graph"}>
                            <div className="graph-info-graph-progress" style={{width: '37%'}}></div>
                        </div>
                    </div>
                </div>

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
