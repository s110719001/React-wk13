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
    useEffect(()=>{
        Cookie.set("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);
    //   const checkoutHandler = () => {
    //     handleCancel();
    //     history.push("/login?redirect=shipping");
    //  }
    console.log(cartItems);
    return(
        <Layout className="container cart">
            <Header className="layout-header">
                <AppHeader></AppHeader>
            </Header>
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
                {cartItems.length === 0 ? (
                    <h2>Cart is empty</h2>
                ) : (
                        <div>
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
                            <Button type={"primary"}>
                                結帳
                            </Button>
                        </div>
                    )}
            </Content>
            <Footer className="layout-footer">
                <AppFooter></AppFooter>
            </Footer>
        </Layout>
    )
}