
import "./App.css";
import Header from "./components/Header/Header.jsx";
import {Toaster} from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList.jsx";
import {Route, Routes} from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout.jsx";
import Hotels from "./components/Hotels/Hotels.jsx";
import HotelProvider from "./components/context/HotelProvider.jsx";
import SingleHotel from "./components/SingleHotel/SingleHotel.jsx";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout.jsx";
import BookmarkProvider from "./components/context/BookmarkProvider.jsx";
import {Bookmark} from "./components/Bookmark/Bookmark.jsx";
import {AddBookmark} from "./components/AddBookmark/AddBookmark.jsx";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark.jsx";
import Login from "./components/Login/Login.jsx";
import AuthProvider from "./components/context/AuthProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return(
      <AuthProvider>
        <BookmarkProvider>
          <HotelProvider>
            <Toaster/>
            <Header/>
            <Routes>
              <Route path="/" element={<LocationList/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/hotels" element={<AppLayout/>}>
                <Route index path=""element={<Hotels/>} />
                <Route path=":id" element={<SingleHotel/>}/>
              </Route>
              <Route path="/bookmarks" element={<ProtectedRoute><BookmarkLayout/></ProtectedRoute>}>
                <Route index path='' element={<Bookmark/>}/>
                <Route path=':id' element={<SingleBookmark/>}/>
                <Route path="add" element={<AddBookmark/>}/>
              </Route>
            </Routes>
          </HotelProvider>
        </BookmarkProvider>
      </AuthProvider>
  )
}

export default App;

