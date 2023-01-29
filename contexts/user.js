import React from "react"
import cookie from "cookiejs"
import { useEffect } from "react"
export let user_context=React.createContext()
export default function User_context({children}){
    
    let [credentials,set_credentials]=React.useState("")
    let [is_loged_in,set_is_loged_in]=React.useState(/*cookie.all().username?true:*/false);
    useEffect(()=>{
        let creds=cookie.all().username?cookie.all():"";
        set_credentials(creds)
        set_is_loged_in(cookie.all().username?true:false)
        console.log(credentials,is_loged_in)
    },[])
    let api="https://hall-booking-site-backend.vercel.app/api/"
    let public_props={
        credentials,set_credentials,api,
        is_loged_in,set_is_loged_in
    }
    return(
        <user_context.Provider value={public_props}>
            {children}
        </user_context.Provider>
    )
}