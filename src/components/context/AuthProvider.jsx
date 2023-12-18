import {createContext, useContext, useReducer} from "react";

const initialState ={
    user:null,
    isAuthenticated:false
}
const AuthContext = createContext()
const FAKE_USER={
    name: "melika",
    email: "user@gmail.com",
    password: "1234"
}
function authReducer(state,action) {
    switch (action.type){
        case "login" :{return {user:action.payload,isAuthenticated:true}}
        case "logout" :{return {user: null,isAuthenticated:false}}
        default :  throw new Error("the action is not supported")

    }
}

export default function AuthProvider ({children}){
    const [{user,isAuthenticated}, dispatch] = useReducer(authReducer, initialState);

    function login(email,password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type: "login" , payload:FAKE_USER})
        }
    }
    function logout() {
        dispatch({type: "logout"})
    }
    return (
        <AuthContext.Provider value={{user , isAuthenticated ,logout,login}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return  useContext(AuthContext);
}