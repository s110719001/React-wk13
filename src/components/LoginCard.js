import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { checkLogin, loginToFirebase, rememberLoginUser } from '../actions'
import { StoreContext } from "../store"

const LoginCard = ({ redirect }) => {
  const { state: { userSignin: { userInfo, loading, error, remember } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await loginToFirebase(dispatch, values);
  };

  const onChange = e => {
    rememberLoginUser(dispatch, e.target.checked);
  }

  //check if user login Use effect below
  useEffect(() => {
    if (userInfo && checkLogin(dispatch)) history.push(redirect);
  }, [userInfo]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h2>歡迎加入上課趣！</h2>
      <h2>現在就開始挑選課程吧！</h2>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="輸入帳號"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="輸入密碼"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name="remember"
          noStyle
        >
          <Checkbox onChange={onChange} checked={remember}>記住帳號密碼</Checkbox>
        </Form.Item>

        <Link className="login-form__forgot" to={"/"}>
            忘記密碼？
        </Link>
      </Form.Item>

      <Form.Item>
        {loading ? (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
            loading
          >
            登入
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
          >
            登入
          </Button>
        )}
        <br></br>
        <Link to={"/register?redirect=/"}>註冊帳號</Link>
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
      <div className="social">
        <img src="image/social/google.png"/>
        <img src="image/social/facebook.png"/>
        <img src="image/social/apple.png"/>
      </div>
    </Form>
  );
};
export default LoginCard;
