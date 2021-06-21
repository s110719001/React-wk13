import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { createOrder, resetOrder, requestOrderDetail } from "../actions"
import { StoreContext } from "../store";

export default function PlaceOrderCard() {
  const { state: { cart, orderInfo: { loading, success, order } }, dispatch } = useContext(StoreContext);
  const { cartItems } = cart;
  const history = useHistory()
  const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

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
      {loading
        ? (
          <div className="spinner-wrap">
            <Spin indicator={antIcon} className="spinner" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            <Col
              xs={{ span: 20, offset: 2 }}
              lg={{ span: 13, offset: 2 }}
            >
              <div className="card card-body">
                <h2 style={{ color: 'black' }}>購買明細</h2>
                <p>
                  <strong>Email:</strong> {cart.shippingAddress.email} <br />
                  <strong>姓名:</strong> {cart.shippingAddress.name} <br />
                  <strong>住址: </strong> {cart.shippingAddress.address}
                </p>
              </div>
              <div className="card card-body">
                <h2 style={{ color: 'black' }}>付款方式</h2>
                <p>
                  <strong></strong> {cart.shippingAddress.PaymentMethod}
                  <strong></strong> {cart.shippingAddress.InvoiceMethod}
                  <strong></strong> {cart.shippingAddress.taxid}
                </p>
              </div>
              <div className="card card-body">
                <h2 style={{ color: 'black' }}>商品資訊</h2>
                {cartItems.length === 0 ? (
                  <div>Cart is empty</div>
                ) : (
                  cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item-content">
                        <div className="cart-name">{item.name}</div>
                      </div>
                      <div className="cart-item-end">
                        <div className="cart-price">
                          ${item.price}
                        </div>
                      </div>

                    </li>
                  ))
                )}
                <div className="cart-total-price-wrap">
                  Total
            <div className="cart-total-price">${getTotalPrice()}</div>
                </div>
              </div>

            </Col>
            <Button
                  className="primary-btn"
                  block
                  type="primary"
                  onClick={placeOrderHandler}
                >
                  確認並送出
                </Button>
          </Row>
        )
      }
    </>

  );
}

