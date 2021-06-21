import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Radio, Input, Button } from "antd";
import { saveShippingAddress } from "../actions"
import { StoreContext } from "../store";

export default function ShippingAddressCard() {
  const { state: { userSignin: { userInfo }, cart: { shippingAddress } }, dispatch } = useContext(StoreContext);
  const { displayName, email } = userInfo;
  const history = useHistory()
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    saveShippingAddress(dispatch, values);
    history.push('/placeorder');
  };
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    
  }
  // const handlePaymentSubmit = (values) => {
  //   savePaymentMethod(dispatch, values);
  //   console.log(values);
  //   history.push('/placeorder')
  // };

  // const handleInvoiceSubmit = (values) => {
  //   saveInvoiceMethod(dispatch, values);
  //   console.log(values);
  //   history.push('/placeorder')
  // };

  console.log()

  return (
    <div className="checkout-paymentinfo">
      <div className="checkout">
        <div className="checkout-process process-order-first">
            <div className="process-order text-color-main bg-second">1</div>
            <div className="process-name text-color-main">商品資訊</div>
        </div>
        <div className="checkout-process">
            <div className="process-order text-white bg-main">2</div>
            <div className="process-name text-color-main">付款資訊</div>
        </div>
        <div className="checkout-process">
            <div className="process-order text-color-main bg-second">3</div>
            <div className="process-name text-color-main">完成結帳</div>
        </div>
      </div>
      <div className="cart-bar bg-main"></div>
      <Form
      onFinish={handleSubmit}
      name="normal_login"
      className="paymentinfo-form"
      initialValues={shippingAddress}
      form={form}
      >
        <div className="shipping-form">
          <div className="shipping-form-top">
            <div className="shipping-form-block">
              <div className="shipping-form-title">
                <div className="shipping-form-label">請填寫購買明細</div>
                <div className="shipping-form-bar"></div>
              </div>
              <Form.Item
                label="Email: "
                name="email"
                initialValue={email}
                className="shipping-form-email"
                rules={[
                  {
                    type: "string",
                  },
                  {
                    required: true,
                    message: "Please input your email",
                  },
                ]}
                hasFeedback
              >
                <Input className="shipping-form-email-input" placeholder="Enter email" />
              </Form.Item>
              <Form.Item
                label="姓名: "
                name="name"
                initialValue={displayName}
                className="shipping-form-name"
                rules={[
                  {
                    type: "string",
                  },
                  {
                    required: true,
                    message: "Please input your name",
                  },
                ]}
                hasFeedback
              >
                <Input className="shipping-form-name-input" placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                label="住址: "
                name="address"
                className="shipping-form-address"
                rules={[
                  {
                    type: "string",
                  },
                  {
                    required: true,
                    message: "Please input your address",
                  },
                ]}
                hasFeedback
              >
                <Input className="shipping-form-address-input" />
              </Form.Item>
              <Form.Item
                label="統編: "
                name="taxid"
                className="shipping-form-taxid"
                rules={[
                  {
                    message: "Please input your tax ID",
                  },
                ]}
                hasFeedback
              >
                <Input className="shipping-form-taxid-input" />
              </Form.Item>
            </div>
            
            <div className="invoice-form">
              <Form.Item className="invoice-form-item" name="InvoiceMethod" label="發票資料" hasFeedback>
                <div className="invoice-form-bar"></div>
                <Radio.Group defaultValue="Phone" onChange={onChange} className="invoice-form-option-group">
                    <Radio className="invoice-form-option" value="Phone">手機載具<Input className="invoice-form-phone-input" placeholder="填寫手機載具"></Input></Radio>
                    <Radio className="invoice-form-option" value="Donate">捐贈發票</Radio>
                    <Radio className="invoice-form-option" value="Mail">郵寄</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
          <div className="payment-form">
            <Form.Item className="payment-form-item" onChange={onChange} name="PaymentMethod" label="付款方式" hasFeedback>
              <div className="payment-form-bar"></div>
              <Radio.Group defaultValue="Google Pay" className="payment-form-group">
                  <Radio className="payment-form-option" value="Google Pay">Google Pay</Radio>
                  <Radio className="payment-form-option" value="PayPal">PayPal</Radio>
                  <Radio className="payment-form-option" value="Credit Card">信用卡</Radio>
                  <Radio className="payment-form-option" value="ATM">ATM轉帳</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="shipping-form__button"
          >
            下一步
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

