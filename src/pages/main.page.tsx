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

export const MainPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        if (user && !user?.userInfo) {
            navigate('/profile/country-timezone');
        }
    }, [user, navigate]);


    const markers = [
        {id: 1, title: "Commercial/Market", x: 50, y: 42, regionIcon: ''},
        {id: 2, title: "Farm", x: 85, y: 56, regionIcon: ''},
        {id: 3, title: "City Hall", x: 13, y: 23, regionIcon: ''},
        {id: 4, title: "Down town", x: 42, y: 20, regionIcon: ''},
        {id: 5, title: "Port", x: 78, y: 78, regionIcon: ''},
        {id: 6, title: "Industrial", x: 10, y: 5, regionIcon: ''},
        {id: 7, title: "Park", x: 18, y: 45, regionIcon: ''},
        {id: 8, title: "Airport", x: 50, y: 2, regionIcon: ''},
        {id: 9, title: "Power plaint", x: 85, y: 0, regionIcon: ''},
        {id: 10, title: "Hospital", x: 75, y: 25, regionIcon: ''},
        {id: 11, title: "Stadium", x: 78, y: 12, regionIcon: ''},
        {id: 12, title: "Train Station", x: 42, y: 52, regionIcon: ''},
        {id: 13, title: "University", x: 45, y: 73, regionIcon: ''},
        {id: 14, title: "Beach", x: 13, y: 70, regionIcon: ''},
    ];


    const [showRegionModal, setShowRegionModal] = useState(false);

    const showRegionModalHandler = (marker: Marker) => {

    }

    return (
        <div>
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
                        <img src="/images/icons/location.png" alt=""/>
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
