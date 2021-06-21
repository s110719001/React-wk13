import React, { useContext, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { Link, useHistory } from "react-router-dom";
import { StoreContext } from "../store/index";
import { cartItemRemove } from "../actions/index";
import Cookie from "js-cookie";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";

const { Header, Content, Footer } = Layout;

export default function Cart(){
    const  { dispatch, state:{cart:{cartItems}}} = useContext(StoreContext)
    const history = useHistory();
    const getTotalPrice = () => {
        return (cartItems.length > 0) ?
           cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
           : 0;
    }
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    }
    useEffect(()=>{
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    
    console.log(cartItems);
    return(
        <Layout className="container cart">
            <Header className="layout-header">
                <AppHeader></AppHeader>
            </Header>
            {cartItems.length === 0 ? (
            <Content className="layout-content cart-content">
                <div className="checkout">
                    <div className="checkout-process process-order-first">
                        <div className="process-order text-white bg-main ">1</div>
                        <div className="process-name text-color-main">商品資訊</div>
                    </div>
                    <div className="checkout-process">
                        <div className="process-order text-color-main bg-second">2</div>
                        <div className="process-name text-color-main">付款資訊</div>
                    </div>
                    <div className="checkout-process">
                        <div className="process-order text-color-main bg-second">3</div>
                        <div className="process-name text-color-main">完成結帳</div>
                    </div>
                </div>
                <div className="cart-bar bg-main"></div>
                <h2 className="text-color-main" style={{marginTop:"56px"}}>Cart is empty</h2>   
            </Content>) : (
                <Content className="layout-content cart-content-show">
                    <div className="checkout">
                        <div className="checkout-process process-order-first">
                            <div className="process-order text-white bg-main ">1</div>
                            <div className="process-name text-color-main">商品資訊</div>
                        </div>
                        <div className="checkout-process">
                            <div className="process-order text-color-main bg-second">2</div>
                            <div className="process-name text-color-main">付款資訊</div>
                        </div>
                        <div className="checkout-process">
                            <div className="process-order text-color-main bg-second">3</div>
                            <div className="process-name text-color-main">完成結帳</div>
                        </div>
                    </div>
                    <div className="cart-item-show">
                        <div className="cart-bar bg-main"></div>
                        <div className="cart-item-list">
                        {
                            cartItems.map(item => (
                                <div className="cart-item">
                                    <img
                                    className="cart-item-image"
                                    src={item.image}
                                    />
                                    <div className="cart-item-detail text-color-main">
                                        <div className="cart-item-name">{item.title}</div>   
                                        <div className="cart-item-price">{item.price}</div>
                                        <div className="cart-item-qty bg-white">x 1</div>
                                    </div>
                                    <div className="cart-btn">
                                        <Button onClick={() => {cartItemRemove(dispatch, item.id)}} className="cart-remove-btn bg-light-red text-white">
                                            從購物車刪除
                                        </Button>
                                    </div>
                                </div>
                        ))
                        }
                        </div>
                        <div className="cart-bar-show bg-main"></div>
                        <Button 
                            className="cart-checkout-btn" 
                            type={"primary"}
                            onClick={checkoutHandler}
                        >
                            結帳
                        </Button>
                    </div>
            </Content>     
            )}
            <Footer className="layout-footer">
                <AppFooter></AppFooter>
            </Footer>
        </Layout>
    )
}