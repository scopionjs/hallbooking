import styles from "../styles/nav.module.scss"
import Link from 'next/link';
import { user_context } from "../contexts/user";
import style from "../styles/footer.module.scss"
import React from "react"
import cookie from "cookiejs";
import { useEffect } from "react";
import { useState } from "react";
import useRoute from "next/router"
import { useRef } from "react";
let Nav=({active})=>{
    let user_ctx=React.useContext(user_context)
    let menu=useRef()
    //let is_loged_in =cookie.all().username?true:false;
    //let is_admin =cookie.all().role=="admin"?true:false;

    let handle_logout=()=>{
        cookie.clear()
        useRoute.push("/")
    }
    let [loaded,set_loaded]=useState(false)
    useEffect(()=>{
        set_loaded(true)
    },[])
    let menu_visible=false
    let toggle_menu=()=>{
        
        if(menu_visible){
            menu.current.style="display:none;"
            menu_visible=false
        }else{
            menu.current.style="display:block;"
            menu_visible=true
        }
    }
    return (
        <header className={styles.header}>
            {loaded?(<nav>
                <div className={styles.logo}>CompanyX</div>
                {/* for mobile*/}
                <div className={styles.mobile_menu_wrapper}>
                    <div className={styles.menu} onClick={toggle_menu}>
                        <section></section>
                        <section></section>
                        <section></section>
                    </div>
                </div>
                <div ref={menu} className={styles.menu_list} onClick={toggle_menu}>
                    <div className={styles.list_wrapper}>
                    {cookie.all().username?(<Link href="/halls"><a className={active=="Halls"?styles.active:""}>Halls</a></Link>):""}
                    {/*cookie.all().username && cookie.all().role=="admin"?(<Link href="/bookings"><a>bookings</a></Link>):""*/}
                    {cookie.all().username && cookie.all().role=="admin"?(<Link href="/createhall"><a className={active=="create hall"?styles.active:""}>create hall</a></Link>):""}
                    <Link href="/"><a className={active=="contact us"?styles.active:""}>contact us</a></Link>
                    <Link href="/#about"><a className={active=="about us"?styles.active:""}>about us</a></Link>
                    {cookie.all().username && cookie.all().role=="admin"?(<Link href="/unapproved"><a className={active=="unapproved"?styles.active:""}>unapproved bookings</a></Link>):""}
                    {cookie.all().username && cookie.all().role=="admin"?(<Link href="/past-events"><a className={active=="past events"?styles.active:""}>past events</a></Link>):""}
                     {cookie.all().username && cookie.all().role=="admin"?(<Link href="/upcoming-events"><a className={active=="upcoming events"?styles.active:""}>upcoming events</a></Link>):""}
                     <div className={styles.btns_wrapper}>
                {cookie.all().username?(<button onClick={handle_logout} >logout</button>):(<Link href="/login"><a>Log In/Register</a></Link>)}
                    
                </div>
                    </div>
                </div>
                {/*for desktops */}
                <div className={styles.nav_container}>
                    <ul className={styles.nav_links}>
                        <li>
                            <Link href="/">
                                 <a>Home</a>
                            </Link>
                        </li>
                           {cookie.all().username?(<li><Link href="/halls"><a>Halls</a></Link></li>):""}
                          {cookie.all().username && cookie.all().role=="admin"?(<li><Link href="/createhall"><a>dashboard</a></Link></li>):""}
                          <li><Link href="/"><a>contact us</a></Link></li>
                          <li><Link href="/#about"><a>about us</a></Link></li>
                          
                    </ul>
                </div>
                <div className={styles.login_btn}>
                {cookie.all().username?(<button onClick={handle_logout} >logout</button>):(<Link href="/login"><a>Log In/Register</a></Link>)}
                    
                </div>
            </nav>):""}
        </header>
    );
}
export default Nav;