import Head from "next/head";
import Nav from "../components/nav";
import styles from "../styles/register.module.scss"
import Link from 'next/link';
import { user_context } from "../contexts/user";
import React from "react"
import { useState } from "react";
import cookie from "cookiejs";
import Router from "next/router"
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

let Register=()=>{
    let txt_area=React.useRef()
    let user_ctx=React.useContext(user_context)
    let [password,set_password]=useState("")
    let [re_entered_password,set_re_entered_password]=useState("")
    let [username,set_username]=useState("")
    let [email,set_email]=useState("")
    let [register_as,set_register]=useState("customer")
    
    let handle_submit=async(e)=>{
        try {
            e.preventDefault()
        console.log(password)
        console.log(email)
        if(!password == re_entered_password){
            txt_area.current.innerHTML="the initial and last password doesnt match"
        }else if(password.length==0 ||username.length==0 ||email.length==0||re_entered_password.length==0  ){
            txt_area.current.innerHTML="input details in all the boxes"
        }else{
            let form=new FormData()
            form.append("hi","hello")
            let res=await fetch(`${user_ctx.api}register/?register_as=${register_as}&password=${password}&username=${username}&email=${email}`,{
                method:"POST",
            })
            let data=await res.json()
            console.log(data)
            if(data.savedUser){
                txt_area.current.setAttribute("style","color:#b38de4c2")
                txt_area.current.innerHTML="registered successfuly!"
                cookie.set(data.savedUser)
                setTimeout(()=>{
                    Router.push("halls")
                },3000)
            }else{
                txt_area.current.innerHTML=data.err.message ||data.err.code
            }
            
    
        }
        } catch (error) {
            txt_area.current.innerHTML=error.message
        }
    }

    return(
        <div className={styles.register_wrapper}>
            <Head>
      <title>CompanyX - register</title>
            </Head>
            <Nav />
            <div className={styles.tabs_wrapper}>
            <Link href="/login"><a >Login</a></Link>
            <Link href="/register"><a >Register</a></Link>
            </div>
            <div className={styles.form_wrapper}>

            <label htmlFor="username">username</label>
                <input required type="text" name="username" onChange={(e)=>{set_username(e.target.value)}} />
                <label htmlFor="email">email</label>

                <input required type="email" name="email"  onChange={(e)=>{set_email(e.target.value)}} />
 
                <label htmlFor="password">password</label>
                <input required type="password" name="password" onChange={(e)=>{set_password(e.target.value)}} />

                <label htmlFor="password">re-enter password</label>
                <input required type="password" name="password" onChange={(e)=>{set_re_entered_password(e.target.value)}}  />

                <button type="submit" onClick={handle_submit}>Register</button>
                <span ref={txt_area}></span>
            </div>
        </div>
    )
}
export default Register;