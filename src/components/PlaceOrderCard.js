import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd";
import BookLoading from "../components/BookLoading"
import { createOrder, resetOrder, requestOrderDetail } from "../actions"
import { StoreContext } from "../store";

export default function PlaceOrderCard() {
  const { state: { cart, orderInfo: { loading, success, order } }, dispatch } = useContext(StoreContext);
  const { cartItems } = cart;
  const history = useHistory()

  const placeOrderHandler = () => {
    createOrder(dispatch, cart)
  };

  const getTotalPrice = () => {
    return (cartItems.length > 0) ?
      cartItems.reduce((sum, item) => sum + parseInt(item.price), 0)
      : 0;
  }

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = cart.cartItems.reduce((a, c) => a + 1 * c.price, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  useEffect(() => {
    if (success) {
      resetOrder(dispatch);
      // requestOrderDetail(dispatch, order.id)
      history.push(`/order/${order.id}`);
    }
  }, [success]);


  return (
    <>
      <div className="checkout">
        <div className="checkout-process process-order-first">
            <div className="process-order text-color-main bg-second">1</div>
            <div className="process-name text-color-main">商品資訊</div>
        </div>
        <div className="checkout-process">
            <div className="process-order text-color-main bg-second">2</div>
            <div className="process-name text-color-main">付款資訊</div>
        </div>
        <div className="checkout-process">
            <div className="process-order text-white bg-main">3</div>
            <div className="process-name text-color-main">完成結帳</div>
        </div>
      </div>
      <div className="cart-bar bg-main"></div>
      {loading
        ? (
          <BookLoading/>
        ) : (
          <>
              <div className="order-detail-form">
                  <div
                     
                  >
                     <div className="buy-detail">
                        <div className="buy-detail-title detail-item-title">購買明細</div>
                        <div className=" detail-item-title-bar"></div>
                        <p>
                            <p className="detail-item-text detail-box1">Email: {cart.shippingAddress.email}</p> 
                           <p className="detail-item-text detail-box1">姓名: {cart.shippingAddress.name}</p> 
                           <p className="detail-item-text detail-box1">住址: {cart.shippingAddress.address}</p> 
                        </p>
                     </div>
                     <div className="invoice-detail">
                        <div className="invoice-detail-title detail-item-title">發票資料</div>
                        <div className=" detail-item-title-bar"></div>
                        <p className=" drow">
                            <p className="invoice-detail-item detail-item-text"  style={{marginTop:"10px"}}>
                                手機載具
                            </p>
                            <p className="invoice-detail-item-value" style={{marginLeft:"30px"}}>
                                {cart.shippingAddress.InvoiceMethod}
                            </p>
                        </p>
                        <h2 className="invoice-detail-item detail-item-title">付款方式</h2>
                        <p className="payment-detail-item-value">
                            {cart.shippingAddress.PaymentMethod}
                        </p>
                     </div>
                  </div>
                  <div
                     xs={{ span: 20, offset: 2 }}
                     lg={{ span: 7, offset: 0 }}
                  >
                     <div className="order-product-detail">
                        <div className="textleft detail-item-title">商品資訊</div>
                        <div className=" detail-item-title-bar"></div>
                        <div className="order-item-detail-box">
                            {cartItems.length === 0 ? (
                            <div>Cart is empty</div>
                            ) : (
                              cartItems.map(item => (
                                <li key={item.id} className="order-item-list drow">
                                    <div className="order-item-name">{item.title}</div>
                                    <div className="order-item-end">
                                        <div className="order-item-price">
                                        ${item.price}
                                        </div>
                                    </div>

                                </li>
                            ))
                            )}
                            <div className="total-bar"></div>
                            <div className="total-detail">
                            <div>
                                <strong>總共 {cart.cartItems.length} 堂</strong>
                            </div>
                            <div>
                                <strong>共 {getTotalPrice()} 元</strong>
                            </div>
                            </div>
                        </div>
                        <div className="order-id-box">
                        添購更多課程
                        </div>
                     </div>

                  </div>
               </div>
              
              <Button
                  className="placeorder-btn"
                  block
                  type="primary"
                  onClick={placeOrderHandler}
                >
                  確認並送出
                </Button>
                </>
        )
      }
    </>

  );
}

