import { user_context } from "../contexts/user";
import style from "../styles/footer.module.scss"
import React from "react"
let Footer=()=>{
    let user_ctx=React.useContext(user_context)
    return(
        <div className={style.footer_wrapper}>
            <p>copyrights allrights reserved.2023</p>
        </div>
    )
}
export default Footer;