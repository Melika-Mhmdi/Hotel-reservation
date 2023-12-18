import {Outlet} from "react-router-dom";
import Map from "../Map/Map"
import {useHotel} from "../context/HotelProvider.jsx";

export default function AppLayout(){
    const {isLoading,hotels} = useHotel()
    return(
        <div className="appLayout">
            <div className="sidebar">
                <Outlet/>
            </div>
            <Map isLoading={isLoading} markerLocations={hotels}/>
        </div>
    )
}