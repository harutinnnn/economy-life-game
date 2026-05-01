import mapImage from "../../public/images/map/main-map.png";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";

export const MainPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !user?.userInfo) {
            navigate('/profile');
        }
    }, [user]);


    const markers = [
        {id: 1, title: "City Center", x: 50, y: 35, regionImage: 'city-center_LE_upscale_prime_x2.jpg'},
        {id: 2, title: "Farm", x: 20, y: 10, regionImage: 'farm_LE_upscale_prime_x2.jpg'},
        {id: 3, title: "Shop", x: 15, y: 30, regionImage: 'market_LE_upscale_prime_x2.jpg'},
        {id: 4, title: "Down town", x: 80, y: 42, regionImage: 'downtown_LE_upscale_prime_x2.jpg'},
        {id: 5, title: "Port", x: 23, y: 58, regionImage: 'port_LE_upscale_prime_x2.jpg'},
        {id: 6, title: "Industrial", x: 75, y: 15, regionImage: 'industrual_LE_upscale_prime_x2.jpg'},
        {id: 7, title: "Fishing", x: 40, y: 85, regionImage: 'fishing_LE_upscale_prime_x2.jpg'},
    ];


    const [showRegionModal, setShowRegionModal] = useState(false);
    const [regionImage, setRegionImage] = useState(null);

    const showRegionModalHandler = (marker: any) => {
        setRegionImage(marker?.regionImage)
        setShowRegionModal(true);
    }

    return (
        <div>
            <div className={"map-wrap"}>
                <img src={mapImage} className="map-img" alt="Game map"/>
                {markers.map((marker) => (
                    <button
                        key={marker.id}
                        className="marker"
                        style={{
                            left: `${marker.x}%`,
                            top: `${marker.y}%`,
                        }}
                        title={marker.title}
                        onClick={() => showRegionModalHandler(marker)}
                    >
                        <img src="/public/images/location.png" alt=""/>
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
                        <img src="/public/images/icons/cancel.png"
                             alt="" className={"close-popup-icon"}
                             onClick={() => setShowRegionModal(false)}/>
                        <img src={"/public/images/map/" + regionImage} alt="" className={"region"}/>
                    </div>
                </div>
            }
        </div>
    )
}