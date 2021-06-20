import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo } from "../actions";
import { StoreContext } from "../store";


const OrderCard2 = () => {
    return(
        <div className="order-card">
            <div className="profile-order">
                <div className="profile-order-title">您的訂單</div>
                <div className="profile-order-list">
                    <Button className="profile-order-list-item">訂單編號：{"0sncnoiscoaisj0xp"}</Button>
                </div>
            </div>
        </div>
    );
}

export default OrderCard2;