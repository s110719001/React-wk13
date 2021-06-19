import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { registerToFirebase } from '../actions'
import { StoreContext } from "../store"

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const RegisterCard = ({ redirect }) => {
  const { state: { userRegister: { userInfo, loading, error } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await registerToFirebase(dispatch, values);
  };

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="register-form"
      scrollToFirstError
    >
      <Form.Item
        name="name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: false,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input 
          className="register-form_name"
          placeholder="輸入名字" 
          prefix={<img src="image/register/account.png" className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: false,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          className="register-form_email"
          placeholder="輸入Email" 
          prefix={<img src="image/register/email.png" className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: false,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input
          className="register-form_password"
          placeholder="輸入密碼"
          prefix={<img src="image/register/password.png" className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="rePassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: false,
            message: "Please re-enter your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          className="register-form_repassword" 
          placeholder="再次輸入密碼" 
          prefix={<img src="image/register/password.png" className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox className="register-form_checkbox">
          <Link to={"/"} className="register-form_checkbox_word text-color-main">同意使用條款</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item className="login-form__login_register" {...tailFormItemLayout}>
        {loading ? (
          <Button
            type="primary"
            className="login-form__login_button"
            htmlType="submit"
            loading
          >
            註冊
          </Button>
        ) : (
          <Button
            type="primary"
            className="login-form__login_button"
            htmlType="submit"
          >
            註冊
          </Button>
        )}
        <br/>
        <div className="register-form_haveaccount">有帳號了？</div>
        <br/>
        <Link to={"/login?redirect=/"} className="register-form_login text-color-main">登入</Link>
        {error === "" ? (
          <></>
        ) : (
          <div className="login-form__error-wrap">
            <h3 className="login-form__error-title">
              <WarningOutlined className="site-form-item-icon" />
              {"  "}There was a problem
             </h3>
            <p className="login-form__error-message">{error}</p>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};
export default RegisterCard;
