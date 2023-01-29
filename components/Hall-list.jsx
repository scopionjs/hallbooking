import Image from "next/image";
import styles from "../styles/hall_list.module.scss"
import Link from "next/link";
import cookie from "cookiejs";
import { useEffect, useState } from "react";
import { user_context } from "../contexts/user";
import React from "react"
import axios from "axios";
let price_txt=[]
let Hall_List =({halls})=>{
  let user_ctx=React.useContext(user_context)
  let [new_price,set_new_price]=useState("")
  let edit_pop = React.useRef()
  let edit_input = React.useRef()
  let handle_delete =async(e)=>{
    if(window.confirm("are you sure you want to delete this item")){
    await axios.post(user_ctx.api+"delete-hall",{id:e.target.parentElement.parentElement.id})
    e.target.parentElement.parentElement.style="display:none;"
    }
  }
  let handle_edit =(e)=>{
    price_txt.push(e.target.parentElement.parentElement.querySelector("#price"))
    console.log(price_txt)
    edit_pop.current.style="display:flex;"
  }
  let handle_save =async(e)=>{
    if(new_price.length!==0){
      console.log(price_txt)
      let res=await axios.put(user_ctx.api+"update-hall?id="+price_txt[0].parentElement.id,{price:new_price})
      console.log(res.data)
      edit_pop.current.style="display:none;"
      price_txt[0].innerHTML="price: k"+new_price
      set_new_price("")
      price_txt=[]
      edit_input.current.value=""
    }
  }
  let handle_cancel=(e)=>{
    //console.log(e.target.parentElement.parentElement)
    e.target.parentElement.parentElement.parentElement.style="display:none;"
    set_new_price("")
      price_txt=[]
      edit_input.current.value=""
  }
  let [isReady,set_isReady]=useState(false)
  useEffect(()=>{
    set_isReady(true)
  },[])
    return(
        <div className={styles.main}>
          <div ref={edit_pop} className={styles.edit_pop_up}>
            <section>
              <label htmlFor="">enter the new price below</label>
              <input ref={edit_input} type="number" name="" id="" onChange={(event)=>{set_new_price(event.target.value)}}/>
              <div>
              <button className={styles.cancel} onClick={handle_cancel}>cancel</button>
              <button className={styles.okay} onClick={handle_save} >okay</button>
              </div>
            </section>
          </div>
        <p className={styles.title}>available halls</p>
        {
          halls.length!==0 &&isReady?(<div className={styles.container}>
            {halls.map((hall, index) => (
            <div id={hall._id}  className={styles.hall} key={index}>
                <div className={styles.image_wrapper}>
                <Image src={hall.images[0]} alt={`${hall.name} image`} layout="fill"/>
                </div>
              <h2>{hall.name}</h2>
              <p className={styles.description}>{hall.description}</p>
              <p>Capacity: {hall.capacity}</p>
              <p>Amenities: {hall.amenities.join(", ")}</p>
              <p id="price">Price: k{hall.price}</p>
              <p>Availability: {hall.availability.map(date => date.toDateString()).join(", ")}</p>
              
              {cookie.all().username && cookie.all().role=="customer"?(<Link href={hall._id?`/book/${hall._id}`:`/book/9999`}><a>book</a></Link>):(<div className={styles.btns}> <button onClick={handle_edit}>edit</button><button onClick={handle_delete}>delete</button></div>)}
            </div>
          ))}
            </div>):(<p className={styles.no_halls}>no halls are available right now</p>)
        }
        
        </div>
    )
}
export default Hall_List;