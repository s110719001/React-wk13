import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Form, Input, Button } from "antd";
import { getUserOrders } from "../actions";
import { StoreContext } from "../store";


const OrderCard = () => {
    const {
        state: {
          userSignin: { userInfo },
          userOrders, 
        },
        dispatch,
      } = useContext(StoreContext);
      useEffect(()=>{
        getUserOrders(dispatch);
      }, [userInfo]);
    console.log(userOrders);
    return(
        <div className="order-card">
            <div className="profile-order">
                <div className="profile-order-title">您的訂單</div>
                <div className="profile-order-list">
                    {userOrders.orders.map(order => (
                    <Button className="profile-order-list-item">
                        <Link to={`/order/${order.id}`}>
                            <div className="profile-order-block" style={{color:"#46A3FF"}}>
                                <p className="profile-order-id">訂單編號：{order.id}</p>
                            </div>
                        </Link>
                    </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderCard;