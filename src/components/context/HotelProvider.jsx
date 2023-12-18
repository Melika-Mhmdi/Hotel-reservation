import {createContext, useContext, useState} from "react";
import {useSearchParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000"
const HotelContext = createContext()

export default function HotelProvider({children}){
    const [currentHotel,setCurrentHotel]= useState({});
    const [isLoadingCurrentHotel,setIsLoadingCurrentHotel] = useState(false);
    const [searchParams,setSearchParams]=useSearchParams()
    const room = JSON.parse(searchParams.get("options"))?.room;
    const destination = searchParams.get("destination");
    // const {isLoading,data}=useFetch(`host_location_like=${destination||""}&name_like=${destination||""}&accommodates_gte=${room||1} `,"http://localhost:5000/hotels");
    const {isLoading,data:hotels}=useFetch(`q=${destination||""}&accommodates_gte=${room||1} `,`${BASE_URL}/hotels`);
    async function getHotel(id) {
        setIsLoadingCurrentHotel(true)
        try {
            const {data} = await axios.get(`${BASE_URL}/hotels/${id}`)
            setCurrentHotel(data);
            setIsLoadingCurrentHotel(false);
        } catch (error) {
            toast.error(error.message)
            setIsLoadingCurrentHotel(false)
        }
    }

    return <HotelContext.Provider value={{isLoading,hotels,isLoadingCurrentHotel,getHotel,currentHotel}}>{children}</HotelContext.Provider>
}

export function useHotel(){
    return useContext(HotelContext);
}