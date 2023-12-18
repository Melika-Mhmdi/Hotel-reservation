import {MdLocationOn, MdLogout} from "react-icons/md";
import {HiCalendar, HiLogout, HiMinus, HiPlus, HiSearch} from "react-icons/hi";
import {useRef, useState} from "react";
import useOutsideClick from "../../hooks/useOutsideClick.jsx";
import DateRange from "react-date-range/dist/components/DateRange/index.js";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns";
import {createSearchParams, NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";

export default function Header(){
    const [searchParams,setSearchParams] = useSearchParams()
    const [destination,setDestination] = useState(searchParams.get('destination')||'')
    const [ openOptions,setOpenOptions] = useState(false)
    const [options,setOptions] = useState({
        adult:1,
        children:0,
        room:1
    })
    const [date,setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key:"selection"
})
    const [openDate,setOpenDate] = useState(false)
    const encodedParams =createSearchParams({
        date:JSON.stringify(date),
        destination:destination,
        options:JSON.stringify(options)
    })
    const navigate = useNavigate()
    const dateRef = useRef();
    useOutsideClick(dateRef,()=>setOpenDate(false),"calender")

    const handleOptions = (name,operation)=>{
        setOptions(prevState => {
            return{...prevState,[name]:operation==="inc"?options[name]+1:options[name]-1}
        })
    }

    const handleSearch=()=>{
        navigate({
            pathname:"/hotels",
            search:encodedParams.toString()
        })
        // setSearchParams(encodedParams)

    }
    return(
        <div className="header">
            <NavLink to="/bookmarks">Bookmarks</NavLink>
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className="headerIcon locationIcon"/>
                    <input
                        value={destination}
                        onChange={(event) =>setDestination(event.target.value)}
                        type="text"
                        placeholder="Where to go?"
                        className="headerSearchInput"
                        name="destination"
                        id="destination"/>
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon"/>
                    <div id="calender" onClick={()=>setOpenDate(!openDate)} className="dateDropDown">
                        {`${format(date.startDate,"MM/dd/yyyy")} to ${format(date.endDate,"MM/dd/yyyy")}`}
                    </div>
                    {openDate && <div ref={dateRef}>
                        <DateRange  minDate={new Date()} moveRangeOnFirstSelection={true} ranges={[date]} onChange={item=> {setDate(item.selection)}} className="date" />
                    </div>}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDown" onClick={()=>setOpenOptions(!openOptions)}>
                        {options.adult} adult &bull; {options.children} children &bull; {options.room} room
                    </div>
                    {openOptions &&<GuestOptionList setOpenOptions={setOpenOptions} handleOptions={handleOptions} options={options}/>}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn" onClick={handleSearch}>
                        <HiSearch className="headerIcon"/>
                    </button>
                </div>
            </div>
            <User/>
        </div>
    )
}

function User(){
    const {logout,user,isAuthenticated}=useAuth();
    const navigate = useNavigate()
    const handleLogout=()=>{
        logout();
        navigate("/")
    }
    return<div>
        {isAuthenticated ? (<div>
            <strong>{user.name}</strong>
            <button>
                &nbsp; <MdLogout onClick={handleLogout} className="logout icon" />
            </button>
        </div>):(<NavLink to="/login">Login</NavLink>)}
    </div>



}

function GuestOptionList({options,handleOptions,setOpenOptions}) {
    const optionsRef = useRef();
    useOutsideClick(optionsRef,()=>setOpenOptions(false),"optionDropDown")
    return  <div className="guestOptions" ref={optionsRef}>
        <OptionItem handleOptions={handleOptions}  type="adult" options={options} minLimit={1} />
        <OptionItem handleOptions={handleOptions}  type="children" options={options} minLimit={0}/>
        <OptionItem handleOptions={handleOptions}  type="room" options={options} minLimit={1}/>
    </div>
}

function OptionItem({options,minLimit,type,handleOptions}){
    return (<div className="guestOptionItem">
        <span className="optionText">{type}</span>
        <div className="optionCounter">
            <button onClick={()=>handleOptions(type,"dec")} className="optionCounterBtn" disabled={options[type]<=minLimit}><HiMinus className="icon"/></button>
            <span  className="optionCounterNumber">{options[type]}</span>
            <button onClick={()=>handleOptions(type,"inc")} className="optionCounterBtn"><HiPlus className="icon"/></button>
        </div>
    </div>)
}