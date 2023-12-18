import {useEffect} from "react";

export default function useOutsideClick(ref,callBackFunction,exceptionId){
    useEffect(()=>{
        function handleOutsideClick(event){
            if (ref.current && !ref.current.contains(event.target)&& event.target.id!==exceptionId){
                callBackFunction()
            }
        }
        document.addEventListener("mousedown",handleOutsideClick)
        return()=>{
            document.removeEventListener("mousedown",handleOutsideClick)
        }
    },[])
}