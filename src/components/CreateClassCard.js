import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo } from "../actions";
import { StoreContext } from "../store";

const CreateClassCard = () => {
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
        className="login-form"
        form={form}
        initialValues={userInfo}
        >
        <Form.Item
          name="classname"
          label="課程名稱: "
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
          <Input placeholder={"請輸入課程名稱"} />
        </Form.Item>
        <Form.Item
          name="lecturer"
          label="講師姓名: "
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
          <Input placeholder={"請輸入真實姓名"} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="聯絡電話: "
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder={"請輸入手機號碼"} />
        </Form.Item>

        <Form.Item
          name="experience"
          label="教學經歷: "
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
          <Input placeholder={"曾在...任職?"}/>
        </Form.Item>
        <Form.Item
          name="principle"
          label="課程大綱: "
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder={"課程內容簡述"}/>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
          >
            送出
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateClassCard;
