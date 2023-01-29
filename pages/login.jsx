import Head from "next/head";
import Nav from "../components/nav";
import styles from "../styles/login.module.scss"
import Link from 'next/link';
import { user_context } from "../contexts/user";
import React from "react"
import { useState } from "react";
import cookie from "cookiejs"
import route from "next/router"
import Cookies from 'js-cookie'
export async function getServerSideProps(context) {
    if(context.req.cookies.username){   
        return {
            redirect: {
              destination: '/halls',
              permanent: false,
            },
          }
    }else{
        return {
            props: { message: `hello` }, // will be passed to the page component as props
          }
    }
    
  }
let Login=()=>{
    let txt_area=React.useRef()
    let user_ctx=React.useContext(user_context)
    let [password,set_password]=useState("")
    let [email,set_email]=useState("")
    let handle_submit=async(e)=>{
        cookie.set({username:1})
        try {
            e.preventDefault()
        if(email.length==0 ||password.length==0 ){
            txt_area.current.innerHTML="hello,kind fill your credentials in all the inputs"
        }else{
            let res=await fetch(user_ctx.api+"login/?password="+password+"&email="+email,{
                method:"POST",
                body:{password,email}
            })
            let data=await res.json()
            if(data.data){
                txt_area.current.setAttribute("style","color:#b38de4c2;")
                txt_area.current.innerHTML=data.message
                //cookie.set(data.data)
                Object.entries(data.data).forEach((item)=>{
                    let [key,value]=item;
                    Cookies.set(key,value)
                    console.log(key,value)
                })
                setTimeout(()=>{
                    route.push("/halls")
                },3000)
            }else{
                txt_area.current.setAttribute("style","color:red;")
                txt_area.current.innerHTML=data.message
            }
     
    
        }
        } catch (error) {
            txt_area.current.innerHTML=error.message
        }
    }
    return(
        <div className={styles.login_wrapper}>
            <Head>
      <title>CompanyX - Login</title>
            </Head>
            <Nav />
            <div className={styles.tabs_wrapper}>
            <Link href="/login"><a >Login</a></Link>
            <Link href="/register"><a >Register</a></Link>
            </div>
            <div className={styles.form_wrapper}>

                <label htmlFor="email">email</label>
                <input required type="email" name="email" onChange={(e)=>{set_email(e.target.value)}} />
 
                <label htmlFor="password">password</label>
                <input required type="password" name="password" onChange={(e)=>{set_password(e.target.value)}}/>
 
                <button type="submit" onClick={handle_submit}>login</button>
                <br />
                <span ref={txt_area}></span>
            </div>
        </div>
    )
}
export default Login;