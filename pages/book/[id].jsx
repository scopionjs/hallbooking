import Nav from "../../components/nav"
import Image from "next/image"
import axios, { Axios } from "axios"
import { user_context } from "../../contexts/user";
import React from "react"
import { useState } from "react";
import cookie from "cookiejs"
import route from "next/router"
export async function getServerSideProps(context) {
  
    if(!context.req.cookies.username ){   
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          }
    }else if(context.req.cookies.username && context.req.cookies.role!=="customer"){
      return {
        redirect: {
          destination: '/halls',
          permanent: false,
        },
      }
    }else{
        let res=await axios.get(`https://hall-booking-site-backend.vercel.app/api/fetch-hall?id=${context.query.id}`)
        if(res.data.hall){
          return {
            props: { hall: res.data.hall }, // will be passed to the page component as props
          }
        }
        
    }
    
  }
export default function Book({hall}){
  let txt_area=React.useRef()
    let user_ctx=React.useContext(user_context)
    let mock_hall={
        name: "Conference Hall",
        description: "Ideal for business meetings and conferences",
        capacity: 100,
        amenities: ["projector", "whiteboard", "Wi-Fi"],
        images: ["/hall3.jpg", "https://example.com/conference-hall-2.jpg"],
        price: 2000,
        availability: [
            new Date("2022-10-01"),
            new Date("2022-10-15"),
            new Date("2022-11-01"),
        ]
      }
      let [startDay,set_startDay]=useState("")
      let [startTime,set_startTime]=useState("")
      let [endDay,set_endDay]=useState("")
      let [endTime,set_endTime]=useState("")
      let [eventName,set_eventName]=useState("")
      let additionalOptions=[]
      let handle_checkbox=(e)=>{
        if(!additionalOptions.includes(e.target.value)){
          additionalOptions.push(e.target.value)
        }else{
          additionalOptions=additionalOptions.filter((val)=>{return val !==e.target.value})
        }
        
      }
      let handle_submit=async()=>{
        console.log(startDay)
        console.log(startTime)
        console.log(endDay)
        console.log(endTime)
        console.log(eventName)
        console.log(additionalOptions)
        if(startDay.length==0 || startTime.length==0 || endTime.length==0|| endTime.length==0|| eventName.length==0){
          txt_area.current.setAttribute("style","color:red;")
          txt_area.current.innerHTML="hello,kind fill details in all the inputs"
        }else{
          try {
            console.log(1)
            let res =await axios.post(user_ctx.api+"book-hall",{
              hallId: route.query.id,
              userId: cookie.all()._id,
              startDate: startDay+" "+startTime,
              endDate:endDay+" "+endTime ,
              cost:hall.price,
              additionalOptions,
              eventName:eventName,
              hallName:hall.name,
              hallImage:hall.images[0],
              userName:cookie.all().username,
          })
          console.log(2)
          if(res.data.message){
            txt_area.current.setAttribute("style","color:#b38de4c2;")
                txt_area.current.innerHTML=res.data.message
                setTimeout(()=>{
                    route.push("/halls")
                },3000)
          }else{
            txt_area.current.setAttribute("style","color:red;")
                txt_area.current.innerHTML=res.data.error
          }
          } catch (error) {
            txt_area.current.setAttribute("style","color:red;")
                txt_area.current.innerHTML="network errors try again"
                console.log(error)
          }
        }
      }
    return(
        <>
        <Nav />
        <div className="book-image">
        <Image src={hall.images[0]} alt={hall.name+"image"} layout="fill"/>
        </div>
        <h2 className="book-hall-name">{hall.name}</h2>
         <p className="book-hall-description">{hall.description}</p>
         <p className="book-hall-price">price: k{hall.price}</p>
         <p className="book-hall-capacity">capacity: {hall.capacity} people</p>

         <label className="book-hall-label-1" htmlFor="">additional amenities:</label>
         <ul className="book-hall-emenities">
          {
            hall.amenities.map((item,index)=>(
              <li key={index}>{item}</li>
            ))
          }
         </ul>
         <p className="book-hall-form-title">fill in the form below to book this hall</p>
         <label htmlFor="" className="book-hall-label">event name</label>
         <input type="text" className="book-hall-input"  onChange={(e)=>{set_eventName(e.target.value)}}/>
         <label htmlFor="" className="book-hall-label">select amenities</label>
         {
          hall.amenities.map((item,index)=>(
            <div key={index} className="amenities-select"><input type="checkbox" name="" id="" onChange={handle_checkbox} value={item} /><label htmlFor="">{item}</label></div>
          ))
         }
         <label htmlFor="" className="book-hall-label">start day</label>
         <input type="date" name="" id="" className="book-hall-input"  onChange={(e)=>{set_startDay(e.target.value)}}/>
         <label htmlFor="" className="book-hall-label">start time</label>
         <input type="time" name="" id="" className="book-hall-input"  onChange={(e)=>{set_startTime(e.target.value)}}/>

         <label htmlFor="" className="book-hall-label">end day</label>
         <input type="date" name="" id="" className="book-hall-input"  onChange={(e)=>{set_endDay(e.target.value)}}/>
         <label htmlFor="" className="book-hall-label">end time</label>
         <input type="time" name="" id="" className="book-hall-input" onChange={(e)=>{set_endTime(e.target.value)}} />
         <button className="book-hall-submit" onClick={handle_submit}>book</button>
         <span className="booh-hall-txt-area" ref={txt_area}></span>
        </>
    )
}