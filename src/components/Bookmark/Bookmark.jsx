import {useBookmarks} from "../context/BookmarkProvider.jsx";
import Loader from "../Loader/Loader.jsx";
import ReactCountryFlag from "react-country-flag";
import {Link} from "react-router-dom";
import {HiTrash} from "react-icons/hi";

export function Bookmark() {
    const {isLoading,deleteBookmark ,bookmarks,currentBookmark} = useBookmarks();
    console.log(bookmarks);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        await deleteBookmark(id);
    }

    if (isLoading) return <Loader/>
    if (!bookmarks.length) return <p>There is no bookmarked location</p>
    return (
        <div className="bookmarkList">
            {bookmarks?.map((bookmark,index) =>{
                return(<Link key={bookmark.id}
                             to={`${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
                >
                   <div className={`bookmarkItem ${bookmark.id===currentBookmark?.id?"current-bookmark":""}`}>
                       <div>
                           <ReactCountryFlag svg countryCode={bookmark.countryCode}/>&nbsp;
                           <strong>{bookmark.cityName}</strong>&nbsp;
                           <span>{bookmark.country}</span>
                       </div>
                       <button onClick={(e)=>handleDelete(e,bookmark.id)}>
                           <HiTrash className="trash"/>
                       </button>
                   </div>
                </Link>)
            })}
        </div>
    );
};