import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useBookmarks} from "../context/BookmarkProvider.jsx";
import Loader from "../Loader/Loader.jsx";
import ReactCountryFlag from "react-country-flag";

export default function SingleBookmark() {
    const {id} = useParams();
    const navigate =useNavigate()
    const {getBookmark,currentBookmark:data,isLoading} = useBookmarks()

    useEffect(()=>{
        getBookmark(id)
    },[id])

    if (isLoading) return <Loader/>
    return (<div>
        <button onClick={()=>navigate(-1)} className="btn btn--back">&larr; Back</button>
        <h2>
            {data.cityName}
        </h2>
        <div className="bookmarkItem">
            <ReactCountryFlag svg countryCode={data.countryCode}/>&nbsp;
            <strong>{data.cityName}</strong>&nbsp;
            <span>{data.country}</span>
        </div>
    </div>)

}