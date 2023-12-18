import {useState} from "react";
import {useAuth} from "../context/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Login (){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {login,isAuthenticated} = useAuth();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email&&password) login(email,password)
    }

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) navigate("/",{replace:true})
    }, [isAuthenticated]);


    return <div className="loginContainer">
        <h2>Login</h2>
        <form onSubmit={(e)=>handleSubmit(e)} className="form">
            <div className="formControl">
                <label htmlFor="email">Email</label>
                <input value={email} type="text" onChange={(e)=>setEmail(e.target.value)} name="email" id="email"/>
            </div>
            <div className="formControl">
                <label htmlFor="password">Password</label>
                <input value={password} type="text" onChange={(e)=>setPassword(e.target.value)} name="password" id="password"/>
            </div>
            <div className="buttons">
                <button type="submit" className="btn btn--primary">
                    Login
                </button>
            </div>
        </form>
    </div>
}