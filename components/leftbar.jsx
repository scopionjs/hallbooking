import styles from "../styles/leftbar.module.scss"
import Link from "next/link"
let Left_bar=({active})=>{
    return(
        <div className={styles.wrapper}>
            <Link href="/createhall"><a className={active=="create"?styles.active:""} >create</a></Link>
            <Link href="/unapproved"><a className={active=="unapproved"?styles.active:""}>unapproved bookings</a></Link>
            <Link href="/past-events"><a className={active=="past events"?styles.active:""}>past events</a></Link>
            <Link href="/upcoming-events"><a className={active=="upcoming events"?styles.active:""}>upcoming events</a></Link>
            <Link href="/hall-admin"><a className={active=="Halls"?styles.active:""}>Halls</a></Link>
        </div>
    )
}
export default Left_bar;