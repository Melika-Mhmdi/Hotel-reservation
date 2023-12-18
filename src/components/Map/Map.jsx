import {useHotel} from "../context/HotelProvider.jsx";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation.jsx";
import Loader from "../Loader/Loader.jsx";
import useUrlLocation from "../../hooks/useUrlLocation.jsx";

export default function Map({isLoading,markerLocations}){
    // const {isLoading,hotels} =useHotel()
    const [mapCenter, setMapCenter] = useState([51,3]);
    const [lat,lng] = useUrlLocation()
    const {isLoading:isLoadingGeoPosition,position:geoLocationPosition,getPosition}=useGeoLocation()

    useEffect(() => {
        if(lat&&lng) setMapCenter([lat,lng])
    }, [lat,lng]);

    useEffect(()=>{
        if (geoLocationPosition?.lat&&geoLocationPosition?.lng){
            setMapCenter([geoLocationPosition.lat,geoLocationPosition.lng])
        }
    },[geoLocationPosition])
    if (isLoading) return <Loader/>
    return<div className="mapContainer">
        <MapContainer className="map" center={mapCenter} zoom={13} scrollWheelZoom={true}>
            <button className="getLocation" onClick={getPosition}>
                {isLoadingGeoPosition?"Loading ...": "Use Your Location"}
            </button>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <DetectClick/>
            <ChangeCenter position={mapCenter}/>
            {markerLocations?.map(item=>(<Marker key={item.id} position={[item.latitude,item.longitude]}>
                <Popup>
                    {item.host_location}
                </Popup>
            </Marker>))}
        </MapContainer>
    </div>
}

function ChangeCenter ({position}) {
    const map = useMap()
    map?.setView(position);
    return null
}

function DetectClick(){
    const navigate = useNavigate()
    useMapEvents({click:e=>navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)})

    return null;
}