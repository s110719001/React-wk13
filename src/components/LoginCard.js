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
      <div className="login-form_welcome text-color-main">
        <div className="login-form_welcome_word">歡迎加入上課趣！</div>
        <div className="login-form_welcome_word">現在就開始挑選課程吧！</div>
      </div>
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
          prefix={<img src="image/login/account.png" className="site-form-item-icon" />}
          placeholder="輸入帳號"
          className="login-form_account"
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
          prefix={<img src="image/login/password.png" className="site-form-item-icon" />}
          type="password"
          placeholder="輸入密碼"
          className="login-form_password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name="remember"
          noStyle
        >
          <Checkbox onChange={onChange} className="login-form__remember text-color-main" checked={remember}>記住帳號密碼</Checkbox>
        </Form.Item>

        <Link className="login-form__forgot text-color-main" to={"/"}>
            忘記密碼？
        </Link>
      </Form.Item>

      <Form.Item className="login-form__login_register">
        {loading ? (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__login_button"
            loading
          >
            登入
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__login_button"
          >
            登入
          </Button>
        )}
        <br></br>
        <Link to={"/register?redirect=/"} className="login-form__register_button text-color-main">註冊帳號</Link>
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
      <div className="login_social">
        <div className="login_social_word">
          <div className="login_social_or_bar"></div>
          <div className="login_social_word_or">or</div>
          <div className="login_social_or_bar"></div>
        </div>
        <div className="login_social_image">
          <img src="image/social/google.png"/>
          <img className="login_social_image_fb" src="image/social/facebook.png"/>
          <img src="image/social/apple.png"/>
        </div>
      </div>
    </Form>
  );
};
export default LoginCard;
