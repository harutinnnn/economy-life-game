import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

type Marker = {
    id: number;
    title: string;
    x: number;
    y: number;
    regionIcon: string;
};

export const WorldPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }
    }, [user, navigate]);


    const markers = [
        {id: 1, title: "Commercial/Market", x: 70, y: 5, regionIcon: ''},
        {id: 2, title: "Farm", x: 20, y: 8, regionIcon: ''},
        {id: 4, title: "Down town", x: 72, y: 22, regionIcon: ''},
        {id: 5, title: "Port", x: 73, y: 73, regionIcon: ''},
        {id: 6, title: "Industrial", x: 85, y: 50, regionIcon: ''},
        {id: 7, title: "Park", x: 10, y: 50, regionIcon: ''},
        {id: 9, title: "City Hall", x: 27, y: 23, regionIcon: ''},
        {id: 10, title: "Hospital", x: 45, y: 40, regionIcon: ''},
        {id: 12, title: "Train Station", x: 20, y: 60, regionIcon: ''},
        {id: 13, title: "University", x: 25, y: 75, regionIcon: ''},
    ];


    const [showRegionModal, setShowRegionModal] = useState(false);

    const showRegionModalHandler = (marker: Marker) => {

    }

    return (
        <div className={'full-height'}>
            <div className={"map-wrap"}>
                <img src="/images/map/map.png" className="map-img" alt="Game map"/>
                {markers.map((marker) => (
                    <button
                        key={marker.id}
                        className="marker marker-anchor"
                        style={{
                            left: `${marker.x}%`,
                            top: `${marker.y}%`,
                        }}
                        onClick={() => showRegionModalHandler(marker)}
                        data-tooltip-content={marker.title}
                    >
                        <img src="/images/icons/marker.png" alt=""/>
                    </button>
                ))}
            </div>


            {showRegionModal &&
                <div className="map-region-modal" onClick={(e: React.MouseEvent) => {
                    const target = e.target as HTMLElement;
                    if (target.classList.contains("map-region-modal")) {
                        setShowRegionModal(false);
                    }
                }}>
                    <div className="map-region-modal-inner">
                        <img src="/images/icons/cancel.png"
                             alt="" className={"close-popup-icon"}
                             onClick={() => setShowRegionModal(false)}/>

                    </div>
                </div>
            }
            <Tooltip id="marker-tooltip" anchorSelect=".marker-anchor" place="bottom"/>
        </div>
    )
}
