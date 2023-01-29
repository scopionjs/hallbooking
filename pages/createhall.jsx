import Create_hall_right from "../components/create-hall-right.jsx";
import Left_bar from "../components/leftbar";
import Nav from "../components/nav"
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
      return {
          props: { message: `hello` }, // will be passed to the page component as props
        }
  }
  
}

let Create_hall =()=>{
    return(
        <div >
            <Nav active="create hall" />
            <div className="create-hall-bars">
                <Left_bar active="create"/>
                <Create_hall_right  />
            </div>
        </div>
    )
}
export default Create_hall;