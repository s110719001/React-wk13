import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo } from "../actions";
import { StoreContext } from "../store";


const RecommendCard = () => {
    return(
        <div className="recommend-card">
            <div className="profile-recommend">
                <div className="profile-recommend-title">
                <img  className="profile-recommend-title-icon" src="image/profile/recommend.png"/>
                為您推薦
                </div>
                <div className="profile-recommend-item">
                <img src="image/list/class1.png" className="profile-recommend-item-cover"/>
                <div className="profile-recommend-item-text"> 
                抹茶控的第一堂課 | 十款職人<br/>
                級抹茶甜點在家輕鬆上桌<br/>
                    <div className="profile-recommend-item-price">NT 2,680</div>
                </div>
                </div>
                <div className="profile-recommend-item">
                <img src="image/list/class1.png" className="profile-recommend-item-cover"/>
                <div className="profile-recommend-item-text"> 
                抹茶控的第一堂課 | 十款職人<br/>
                級抹茶甜點在家輕鬆上桌<br/>
                    <div className="profile-recommend-item-price">NT 2,680</div>
                </div>
                </div>
                <div className="profile-recommend-item">
                <img src="image/list/class1.png" className="profile-recommend-item-cover"/>
                <div className="profile-recommend-item-text"> 
                抹茶控的第一堂課 | 十款職人<br/>
                級抹茶甜點在家輕鬆上桌<br/>
                    <div className="profile-recommend-item-price">NT 2,680</div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default RecommendCard;