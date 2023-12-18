import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import {useHotel} from "../context/HotelProvider.jsx";
import {useEffect} from "react";

export default function SingleHotel(){
    const {id}  =useParams();
    const {isLoadingCurrentHotel:isLoading,getHotel,currentHotel:data}=useHotel()
    useEffect(() => {
        getHotel(id)
    }, []);


    if (isLoading) return <Loader/>
    return <div className="room">
        <div className="roomDetail">
            <h2>{data?.name}</h2>
            <div>
                {data?.number_of_reviews} reviews &bull;{data?.smart_location}
            </div>
            <img src={data?.picture_url?.url}  alt={data?.name}/>
        </div>
    </div>
}