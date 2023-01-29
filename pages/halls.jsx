import axios from "axios";
import Hall_List from "../components/Hall-list";
import Nav from "../components/nav";
export async function getServerSideProps(context) {
  if(!context.req.cookies.username){   
      return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
  }else{
    let res=await axios.get("https://hall-booking-site-backend.vercel.app/api/fetch-halls")
      return {
          props: { halls: res.data.halls }, // will be passed to the page component as props
        }
  }
  
}
export default function Halls({halls}){
    const mock_halls = [
        {
          name: "Grand Ballroom",
          description: "Perfect for grand receptions and corporate events",
          capacity: 500,
          amenities: ["air conditioning", "stage", "audio-visual equipment"],
          images: ["/hall2.jpg", "https://example.com/grand-ballroom-2.jpg"],
          price: 5000,
          availability: [
              new Date("2022-10-01"),
              new Date("2022-10-15"),
              new Date("2022-11-01"),
          ]
        },
        {
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
        },
        {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
        {
          name: "Banquet Hall",
          description: "Great for intimate gatherings and parties",
          capacity: 300,
          amenities: ["lighting system", "dance floor", "sound system"],
          images: ["/hall4.jpg", "https://example.com/banquet-hall-2.jpg"],
          price: 3500,
          availability: [
              new Date("2022-10-01"),
              new Date("2022-10-15"),
              new Date("2022-11-01"),
          ]
        }
      ];
      
    return(
        <div style={{backgroundColor:"rgba(243, 243, 243, 0.933)"}}>
        <Nav/>
    <br /><br /><br />
    <Hall_List halls={halls} />
        </div>
    )
}