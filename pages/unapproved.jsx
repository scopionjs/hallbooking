import Nav from "../components/nav"
import UnapprovedList from "../components/unapprovedList"
import Left_bar from "../components/leftbar"
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
      let res=await axios.get("https://hall-booking-site-backend.vercel.app/api/fetch-unapproved-bookings")
      if(res.data.unapprovedBookings){
        return {
          props: { bookings:res.data.unapprovedBookings  }, // will be passed to the page component as props
        }
      }
        
    }
    
  }
export const mock_bookings = [
    {
    hall: '5f86dcd9f09c221f9c24cf85',
    user: '5f86dcd9f09c221f9c24cf86',
    date: '2022-01-01',
    additionalOptions: ['Catering', 'Audio equipment'],
    status: 'approved',
    cost: 2000,
    startDate: "2022-03-20",
    endDate: "2022-03-25",
    eventName: "Wedding",
    hallName: "Hall A",
    hallImage: "/Hall1.jpg",
    userName: "John Doe"
    },
    {
    hall: '5f86dcd9f09c221f9c24cf87',
    user: '5f86dcd9f09c221f9c24cf88',
    date: '2022-02-01',
    additionalOptions: ['Projector', 'Lighting'],
    status: 'approved',
    cost: 1500,
    startDate: "2022-04-10",
    endDate: "2022-04-12",
    eventName: "Conference",
    hallName: "Hall B",
    hallImage: "/Hall2.jpg",
    userName: "Jane Smith"
    },
    {
    hall: '5f86dcd9f09c221f9c24cf89',
    user: '5f86dcd9f09c221f9c24cf90',
    date: '2022-03-01',
    additionalOptions: [],
    status: 'approved',
    cost: 1000,
    startDate: "2022-05-01",
    endDate: "2022-05-03",
    eventName: "Birthday party",
    hallName: "Hall C",
    hallImage: "/Hall3.jpg",
    userName: "Mike Johnson"
    },
    {
        hall: '5f86dcd9f09c221f9c24cf89',
        user: '5f86dcd9f09c221f9c24cf90',
        date: '2022-03-01',
        additionalOptions: [],
        status: 'approved',
        cost: 1000,
        startDate: "2022-05-01",
        endDate: "2022-05-03",
        eventName: "Birthday party",
        hallName: "Hall C",
        hallImage: "/Hall4.jpg",
        userName: "Mike Johnson"
        },
        {
            hall: '5f86dcd9f09c221f9c24cf89',
            user: '5f86dcd9f09c221f9c24cf90',
            date: '2022-03-01',
            additionalOptions: [],
            status: 'approved',
            cost: 1000,
            startDate: "2022-05-01",
            endDate: "2022-05-03",
            eventName: "Birthday party",
            hallName: "Hall C",
            hallImage: "/Hall1.jpg",
            userName: "Mike Johnson"
            }
    ];

export default function  Unapproved({bookings}){
    return(
        <>
        <Nav active={"unapproved"}/>
        <div className="create-hall-bars" >
            <Left_bar active={"unapproved"} />
            <UnapprovedList bookings={bookings} />
        </div>
        </>
    )
}