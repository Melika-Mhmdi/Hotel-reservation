import {useNavigate} from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";
import ReactCountryFlag from "react-country-flag";
import {useBookmarks} from "../context/BookmarkProvider.jsx";

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
// export function getFlagEmoji(countryCode) {
//     const codePoints = countryCode
//         .toUpperCase()
//         .split('')
//         .map(char =>  127397 + char.charCodeAt());
//     return String.fromCodePoint(...codePoints);
// }

export function AddBookmark() {
    const navigate = useNavigate()
    const [lat,lng] = useUrlLocation()
    const [cityName,setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [countryCode, setCountryCode] = useState("")
    const [isLoadingGeocoding , setIsLoadingGeoCoding] = useState(false)
    const {createBookmark} = useBookmarks()

    useEffect(()=>{
        if (!lat||!lng) return;

        async function fetchLocationData (){
            setIsLoadingGeoCoding(true)
            try {
                const {data} = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
               if (!data.countryCode) throw new Error("this location is not a city! please click somewhere else")
                setCityName(data?.city ||data?.locality ||"")
                setCountryCode(data?.countryCode)
                setCountryName(data?.countryName )
                // setCountryCode(getFlagEmoji(data?.countryCode))
            }
            catch (err) {
                toast.error(err.message)
            }
            finally {
                setIsLoadingGeoCoding(false)
            }
        }
        fetchLocationData()
    },[lat,lng])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!cityName && !countryName) return
        const newBookmark = {
            cityName,
            country: countryName,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + "" + countryName
        };
        await createBookmark(newBookmark);
        navigate("/bookmarks")

    }



    if (isLoadingGeocoding) return <Loader/>
    return (
        <div>
            <h2>Bookmark New Location</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="formControl">
                    <label htmlFor="cityName">CityName</label>
                    <input onChange={(e)=>setCityName(e.target.value)} value={cityName} type="text" name="cityName" id="cityName"/>
                </div>
                <div className="formControl">
                    <label htmlFor="countryName">CountryName</label>
                    <input onChange={(e)=>setCountryName(e.target.value)} value={countryName} type="text" name="countryName" id="countryName"/>
                {/*<span className="flag">{countryCode}</span>*/}
                    <ReactCountryFlag svg countryCode={countryCode} className="flag"/>

                </div>
                <div className="buttons">
                    <button onClick={(e)=>{
                        e.preventDefault();
                        navigate(-1)}
                    } className="btn btn--back">&larr; Back</button>
                    <button className="btn btn--primary">Add</button>
                </div>
            </form>
        </div>
    );
};