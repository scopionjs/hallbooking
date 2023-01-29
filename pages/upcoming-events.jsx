import Nav from "../components/nav"
import Upcoming_events_list from "../components/upcoming-events-list"
import Left_bar from "../components/leftbar"
//import { bookings } from "./unapproved"
import axios from "axios"
export async function getServerSideProps(context) {
    if(!context.req.cookies.username ){   
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            },
          }
    }else if(context.req.cookies.username && context.req.cookies.role!=="admin"){
      return {
        redirect: {
          destination: '/halls',
          permanent: false,
        },
      }
    }else{
      let res=await axios.get("https://hall-booking-site-backend.vercel.app/api/upcoming-events")
      if(res.data.upcomingBookings){
        return {
          props: { bookings: res.data.upcomingBookings }, // will be passed to the page component as props
        }
      }
        
    }
    
  }
let Upcoming_events=({bookings})=>{
    return(
        <>
        <Nav active={"upcoming events"}/>
        <div className="create-hall-bars" >
            <Left_bar active={"upcoming events"} />
            <Upcoming_events_list bookings={bookings} />
        </div>
        </>
    )
}
export default Upcoming_events