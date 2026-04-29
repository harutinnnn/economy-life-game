import mapImage from "../../public/images/main-page-bg.png";

export const MainPage = () => {

    const markers = [
        {id: 1, title: "City Center", x: 175, y: 450},
        {id: 2, title: "Farm", x: 310, y: 410},
        {id: 3, title: "Shop", x: 110, y: 310},
        {id: 4, title: "Down town", x: 180, y: 120},
        {id: 5, title: "Port", x: 300, y: 210},
        {id: 6, title: "Factory", x: 30, y: 240},
    ];

    return (
        <div>
            <div className={"map-wrap"}>
                <img src={mapImage} className="map-img" alt="Game map"/>
                {markers.map((marker) => (
                    <button
                        key={marker.id}
                        className="marker"
                        style={{
                            left: `${marker.x}px`,
                            top: `${marker.y}px`,
                        }}
                        title={marker.title}
                        onClick={() => alert(marker.title)}
                    >
                        <img src="/public/images/location.png" alt=""/>
                    </button>
                ))}
            </div>
        </div>
    )
}