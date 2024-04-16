import { createContext, useReducer, useEffect, useContext } from "react"

const INITIAL_VALUE = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    
    loading: false,
    error: null,
}

//Creating context with initial value
export const AuthContext = createContext(INITIAL_VALUE)


const AuthReducer = (state, action) => {
   
// console.log( "Logout",cartData);
    switch (action.type) {

        case "Login_Start":
            return {
             
                token: null,
                loading: true,
                error: null,
            }

        case "Login_Sucess":
            return {
                token: action.payload.token,
                loading: false,
                error: null,
            }
        case "Login_Fail":
            return {
                token: null,
                loading: false,
                error: action.payload,
            }
        case "Logout":
            
            return {
             
                token: null,
                loading: false,
                error: null,
            }
        default:
            return state
    }

} 

export const AuthContextProvider= ({children})=> {
    const [state, dispatchAuth]= useReducer(AuthReducer, INITIAL_VALUE)
    
    useEffect(() => {
    
        localStorage.setItem("token", JSON.stringify(state.token))
    }, [state.token])
    

    
    return (<AuthContext.Provider value={{...state, dispatchAuth}}>{children}</AuthContext.Provider>)
}