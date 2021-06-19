import { useEffect, useContext } from "react";
import { Button } from "antd";
import { useHistory, Link } from 'react-router-dom';

import { StoreContext } from "../store"

export default function UserInfo(props) {

   const { state: { userSignin : { userInfo, remember } } } = useContext(StoreContext);
   const history = useHistory();

   const goToProfile = () => {
      history.push("/login?redirect=profile");
   };

   useEffect(() => {
      if(remember)
         localStorage.setItem("userInfo", JSON.stringify(userInfo));
      else
       localStorage.removeItem("userInfo");
   }, [userInfo, remember]);

   return (
      <>
         <nav onClick={goToProfile} style={{ ...props.style }} className="header-profile" >
            {userInfo
               ? <img className="header-profile-icon" src="image/header/profile.png" />
               : <Button className="header-btn-login header-btn-login text-white">
                     
                     <img
                        className="header-phone-burger-btn"
                        src="/image/header/burger.png"
                     />
                     <div className="header-btn-name">登入</div>
                     
                  </Button>

            }
            {/* <p className="cart-summary-text">
               {userInfo
                  ? `${userInfo.displayName}'s`
                  : `訪客`
               }
            </p> */}
         </nav>
      </>
   );
}
