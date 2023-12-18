import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000"
const BookmarkContext = createContext()
const initialState = {
    bookmarks: [],
    isLoading: false,
    currentBookmark: {},
    error:null
}
function bookmarkReducer(state,action) {
    switch (action.type) {
        case "loading": return {...state,isLoading: true}
        case "bookmarks/loaded":return {...state,isLoading: false,bookmarks: action.payload}
        case "bookmark/created":return {...state,isLoading: false,currentBookmark:{...action.payload} ,bookmarks: [...state.bookmarks,action.payload]}
        case "bookmark/loaded":return  {...state,isLoading: false,currentBookmark:{...action.payload}}
        case "bookmark/deleted":return {...state,isLoading: false,currentBookmark: null,bookmarks: state.bookmarks.filter(item=>item.id!==action.payload)}
        case "rejected": return {...state,isLoading: false ,error: action.payload}
        default: throw new Error("unknown action")
    }
}

export default function BookmarkProvider({children}){
    // const [currentBookmarks,setCurrentBookmarks]  = useState({});
    // const [isLoading,setIsLoading] = useState(false)
    // const [bookmarks,setBookmarks] = useState([])
    const [{bookmarks,isLoading,currentBookmark},dispatch] = useReducer(bookmarkReducer,initialState)

    useEffect(() => {
        async function fetchBookmarksList() {
            dispatch({type:"loading"})
            try {
                const {data} = await axios.get(`${BASE_URL}/bookmarks`)
                dispatch({ type : "bookmarks/loaded", payload : data});
            } catch (err) {
                dispatch({type:"rejected",payload:err.message});
            }
        }
        fetchBookmarksList();
    }, []);

    async function getBookmark(id) {
        if (Number(id)===currentBookmark?.id)return

        dispatch({type:"loading"})
        try {
            const {data} = await axios.get(`${BASE_URL}/bookmarks/${id}`)
            dispatch({type:"bookmark/loaded",payload:data})
        } catch (err) {
            dispatch({type:"rejected",payload:err.message});
        }
    }

    async function deleteBookmark(id) {
        dispatch({type:"loading"})
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`);
            dispatch({type:"bookmark/deleted",payload:id})
        } catch (err) {
            dispatch({type:"rejected",payload:err.message});
        }
    }

    async function createBookmark(newBookmark) {
        dispatch({type:"loading"});
        try {
            if(bookmarks?.map(item=>item.cityName).includes(newBookmark.cityName)) throw new Error("this location bookmarked before")
            await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
            dispatch({type:"bookmark/created",payload:newBookmark})
        } catch (err) {
            dispatch({type:"rejected",payload:err.message});
        }
    }

    return (<BookmarkContext.Provider value={{deleteBookmark,createBookmark,bookmarks,isLoading,currentBookmark,getBookmark}}>
        {children}
    </BookmarkContext.Provider>)
}

export function useBookmarks(){
    return  useContext(BookmarkContext);
}
