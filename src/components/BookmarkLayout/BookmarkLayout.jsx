import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";
import {useBookmarks} from "../context/BookmarkProvider.jsx";

export default function BookmarkLayout (){
    const {isLoading,bookmarks} = useBookmarks();
    return(
        <div className="appLayout">
            <div className="sidebar">
             <Outlet/>
            </div>
            <Map isLoading={isLoading} markerLocations={bookmarks}/>
        </div>
    )
}