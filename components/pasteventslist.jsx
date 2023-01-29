import styles from "../styles/pasteventslist.module.scss"
import Image from "next/image"
let Past_events_list=({bookings})=>{
    return(
        <div className={styles.wrapper}>
            {
                bookings.map((book,index)=>(
                    <div className={styles.book_item} key={index}>
                        <div className={styles.image_wrapper} ><Image alt={book.hallName} src={book.hallImage} layout="fill"/></div>
                        <h4>{book.hallName}</h4>
                        <p>event: {book.eventName}</p>
                        <p>booked by: {book.userName}</p>
                        <p>price: k{book.cost}</p>
                        <p>from: {book.startDate}</p>
                        <p>to: {book.endDate}</p>
                        {/*
                        <div  className={styles.btns}>
                        <button>approve</button>
                        <button>decline</button>
                        </div>
                */}
                    </div>
                ))
            }
        </div>
    )
}
export default Past_events_list