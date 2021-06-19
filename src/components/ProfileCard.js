import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo } from "../actions";
import { StoreContext } from "../store";

const ProfileCard = () => {
  const {
    state: {
      userSignin: { userInfo },
    },
    dispatch,
  } = useContext(StoreContext);
  const { displayName, email } = userInfo;
  const history = useHistory();
  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    console.log(values)
    updateUserInfo(dispatch, values);
  };

  const handleLogout = () => {
    logoutFromFirebase(dispatch);
    history.push("/");
  };
  return (
    <div>
      <Form
      onFinish={handleUpdate}
      name="normal_login"
      className="profile-form"
      form={form}
      initialValues={userInfo}
      >
        <div className="profile-user">
          <img className="profile-user-icon" src="image/profile/usericon.png"/>
          <img className="profile-user-upload-icon" src="image/profile/uploadicon.png"/>
          <h1 className="profile-user-welcome text-color-main">{displayName}，歡迎回來!</h1>
        </div>
        <div className="profile-form-inputs">
          <Form.Item
            label="姓名："
            name="name"
            className="profile-form-label"
            rules={[
              {
                type: "string",
                message: "The input is not valid name!",
              },
              {
                message: "Please input your name!",
              },
            ]}
            hasFeedback
          >
            <Input className="profile-form-name profile-form-input" placeholder={displayName} />
          </Form.Item>
          <Form.Item
            label="Email："
            name="email"
            className="profile-form-email profile-form-label"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input className="profile-form-emai profile-form-input" placeholder={email} />
          </Form.Item>
          <Form.Item
            name="password"
            label="密碼："
            className="profile-form-label"
            rules={[
              {
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password className="profile-form-password profile-form-input" iconRender={visible =>(visible ? <></> : <></>)} />
          </Form.Item>

          <Form.Item
            name="rePassword"
            label="再次輸入："
            className="profile-form-label"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
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
            <Input.Password className="profile-form-repassword profile-form-input" iconRender={visible =>(visible ? <></> : <></>)} />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
          >
            送出新資料
          </Button>

          <Button
            type="danger"
            style={{ marginTop: "0.8rem" }}
            className="login-form__button"
            onClick={handleLogout}
          >
            登出
          </Button>
        </Form.Item>
      </Form>
      <div>
          您的訂單
      </div>
      <div>
          為您推薦
      </div>
    </div>
  );
};
export default ProfileCard;
