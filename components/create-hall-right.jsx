import { useState } from "react";
import styles from "../styles/create-hall-right.module.scss"
import { user_context } from "../contexts/user";
import React from "react"
import axios from "axios"
let Create_hall_right=()=>{
    let txt_area=React.useRef()
    let user_ctx=React.useContext(user_context)
    let [name,set_name]=useState("")
    let [capacity,set_capacity]=useState("")
    let [description,set_description]=useState("")
    let [price,set_price]=useState("")
    let [amenities,set_amenities]=useState("")
    let [images,set_file]=useState("")

    let handler_submit=async()=>{
        console.log(1)
        if(name.length==0||capacity.length==0||description.length==0||price.length==0||amenities.length==0||images.length==0){
            txt_area.current.innerHTML="hi,kind fill the details of the hall in all the inputs"
        }else{
            console.log(3)
            try {
                let data = new FormData()
                data.append("file",images[0])
                data.append("upload_preset", "mingle-up");
                    let response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dbkpvjl7s/image/upload",
                    data
                    );
                //after uploading image
                if(response){
                    let res=await axios.post(user_ctx.api+"/create-hall",{name,capacity,description,price,amenities:amenities.split(","),images:[response.data.secure_url]})
                if(res.data.error){
                    txt_area.current.setAttribute("style","color:red;")
                    txt_area.current.innerHTML=res.data.error
                }else{
                    txt_area.current.setAttribute("style","color:#a373e2;")
                    txt_area.current.innerHTML=res.data.message
                    document.body.querySelectorAll("input").forEach((element)=>{
                        element.value=""
                    })
                    set_capacity("")
                    set_description("")
                    set_amenities("")
                    set_file("")
                    set_name("")
                    set_price("")
                }
                }
                
            } catch (error) {
                console.log(error.message)
                txt_area.current.setAttribute("style","color:red;")
                txt_area.current.innerHTML="network errors please try again later"
            }
        }
    }
    return(
       <div className={styles.wrapper}>
        <p>add a new hall</p>
        <label htmlFor="">hall name</label>
        <input type="text" name="" id="" onChange={(e)=>{set_name(e.target.value)}} />
        <label htmlFor="">description</label>
        <input type="text" name="" id="" onChange={(e)=>{set_description(e.target.value)}}/>
        <label htmlFor="">capacity</label>
        <input type="number" name="" id="" onChange={(e)=>{set_capacity(e.target.value)}}/>
        <label htmlFor="">price</label>
        <input type="number" name="" id="" onChange={(e)=>{set_price(e.target.value)}}/>
        <label htmlFor="">amenities(separate by a comma)</label>
        <input type="text" name="" id="" onChange={(e)=>{set_amenities(e.target.value)}}/>
        <label htmlFor="">choose image</label>
        <input type="file" style={{border: "none"}} name="" accept="image/*" id="" onChange={(e)=>{set_file(e.target.files)}}/>
        <button onClick={handler_submit} >add</button>
        <span ref={txt_area}></span>
        </div>
    )
}
export default Create_hall_right; 