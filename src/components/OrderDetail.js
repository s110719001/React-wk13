import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Spin, Button } from "antd";
import BookLoading from "../components/BookLoading"
import GooglePayButton from '@google-pay/button-react';
import { requestOrderDetail } from "../actions"
import { StoreContext } from "../store";

export default function OrderDetail({ orderId }) {
   const { state: { orderDetail: { loading, order } }, dispatch } = useContext(StoreContext);
   const { orderItems } = order;
   const history = useHistory()

   const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example"
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Merchant"
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: String(order.totalPrice),
        currencyCode: "USD",
        countryCode: "US"
      }
    };

   useEffect(() => {
      requestOrderDetail(dispatch, orderId)
   }, [orderId])

   return (
      <div className="order-detail">
         {loading
            ? (
               <BookLoading/>
            ) : (
               <div className="order-detail-form">
                  <div
                     
                  >
                     <div className="buy-detail">
                        <div className="buy-detail-title detail-item-title">購買明細</div>
                        <div className=" detail-item-title-bar"></div>
                        <p>
                            <p className="detail-item-text detail-box1">Email: {order.shippingAddress.email}</p> 
                           <p className="detail-item-text detail-box1">姓名: {order.shippingAddress.name}</p> 
                           <p className="detail-item-text detail-box1">住址: {order.shippingAddress.address}</p> 
                        </p>
                     </div>
                     <div className="invoice-detail">
                        <div className="invoice-detail-title detail-item-title">發票資料</div>
                        <div className=" detail-item-title-bar"></div>
                        <p className=" drow">
                            <p className="invoice-detail-item detail-item-text">
                                手機載具
                            </p>
                            <p className="invoice-detail-item-value">
                                {order.shippingAddress.InvoiceMethod}
                            </p>
                        </p>
                        <h2 className="invoice-detail-item detail-item-title">付款方式</h2>
                        <p className="payment-detail-item-value">
                            {order.shippingAddress.PaymentMethod}
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
                            {orderItems.length === 0 ? (
                            <div>Cart is empty</div>
                            ) : (
                            orderItems.map(item => (
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
                                <strong>總共 {order.orderItems.length} 堂</strong>
                            </div>
                            <div>
                                <strong>共 {order.totalPrice} 元</strong>
                            </div>
                            </div>
                        </div>
                        <div className="order-id-box">
                            訂單編號: {order.id}
                        </div>
                        <GooglePayButton
                           environment="TEST"
                           buttonColor="black"
                           className="order-googlepay"
                           paymentRequest={paymentRequest}
                           onLoadPaymentData={paymentRequest => {
                              console.log('load payment data', paymentRequest);
                              history.push('/');
                           }}
                        />
                     </div>

                  </div>
               </div>

            )

         }

      </div>


   );
}

