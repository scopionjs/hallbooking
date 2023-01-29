import styles from "../styles/unapprovedlist.module.scss"
import Image from "next/image"
import { user_context } from "../contexts/user";
import React from "react"
import axios from "axios";
let UnapprovedList=({bookings})=>{
    let user_ctx=React.useContext(user_context)
    let handle_decline=async(e)=>{
        if(window.confirm("are you sure you want to decline this booking")){
            let res=await axios.get(user_ctx.api+"decline-booking?id="+e.target.parentElement.parentElement.id)
            console.log(res.data)
            e.target.parentElement.parentElement.style="display:none;"
            }
    }
    let handle_approve =async(e)=>{
        if(window.confirm("are you sure you want to approve this booking")){
            let res=await axios.get(user_ctx.api+"approve-booking?id="+e.target.parentElement.parentElement.id)
            console.log(res.data)
            e.target.parentElement.parentElement.style="display:none;"
            }
    }
    return(
        <div className={styles.wrapper}>
            {
                bookings.map((book,index)=>(
                    <div id={book._id} className={styles.book_item} key={index}>
                        <div className={styles.image_wrapper} ><Image alt={book.hallName} src={book.hallImage} layout="fill"/></div>
                        <h4>{book.hallName}</h4>
                        <p>event: {book.eventName}</p>
                        <p>booked by: {book.userName}</p>
                        <p>price: k{book.cost}</p>
                        <p>from: {book.startDate}</p>
                        <p>to: {book.endDate}</p>
                        <div  className={styles.btns}>
                        <button onClick={handle_approve}>approve</button>
                        <button onClick={handle_decline}>decline</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default UnapprovedList;