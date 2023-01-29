import Nav from "../components/nav"
import Past_events_list from "../components/pasteventslist"
import Left_bar from "../components/leftbar"
import axios from "axios"
//import { bookings } from "./unapproved"
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
      let res=await axios.get("https://hall-booking-site-backend.vercel.app/api/past-events")
      if(res.data.pastBookings){
        return {
          props: { bookings: res.data.pastBookings }, // will be passed to the page component as props
        }
      }
    }
    
  }
let Past_events=({bookings})=>{
    return(
        <>
        <Nav active={"past events"}/>
        <div className="create-hall-bars" >
            <Left_bar active={"past events"} />
            <Past_events_list bookings={bookings} />
        </div>
        </>
    )
}
export default Past_events