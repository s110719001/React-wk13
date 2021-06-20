import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo } from "../actions";
import { StoreContext } from "../store";

const { TextArea } = Input;

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

  return (
    <div className="create-layout">
        <Form
        onFinish={handleUpdate}
        name="normal_login"
        className="create-form"
        form={form}
        initialValues={userInfo}
        >
        <div style={{display:"flex",flexDirection:"row"}}>
          <div>
            <Form.Item
              name="classname"
              label="課程名稱: "
              className="create-form-classname create-form-label"
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
              <Input className="create-form-classname_input create-form-input" placeholder={"請輸入課程名稱"} />
            </Form.Item>
            <Form.Item
              name="lecturer"
              label="講師姓名: "
              className="create-form-lecturer create-form-label"
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
              <Input className="create-form-lecturer_input create-form-input" placeholder={"請輸入真實姓名"} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="聯絡電話: "
              className="create-form-phone create-form-label"
              rules={[
                {
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input className="create-form-phone_input create-form-input" placeholder={"請輸入手機號碼"} />
            </Form.Item>

            <Form.Item
              name="experience"
              label="教學經歷: "
              className="create-form-experience create-form-label"
              hasFeedback
              rules={[
                {
                  message: "Please re-enter your password!",
                }
              ]}
            >
              <Input className="create-form-experience_input create-form-input" placeholder={"曾在...任職?"}/>
            </Form.Item>
          </div>


          
          <div className="create-form-cover">
            <div className="create-form-cover-text">上傳課程圖片：</div>
            <div>
              <div style={{display:"flex",flexDirection:"row"}}>
                <Button className="create-form-class-cover-button">選擇檔案</Button>
                <div className="create-form-class-cover-text">（或是拖曳至以下表格）</div>
              </div>
              <div className="create-form-class-cover-form">
                <div className="create-form-class-cover-form-bar"></div>
                <div className="create-form-class-cover-form-bar"></div>
                <div className="create-form-class-cover-form-bar"></div>
                <div className="create-form-class-cover-form-bar"></div>
              </div>
            </div>
          </div> 
        </div>
        <Form.Item
          name="principle"
          label="課程大綱: "
          className="create-form-principle create-form-principle-label"
          hasFeedback
        >
          <TextArea  className="create-form-principle_input" placeholder={"課程內容簡述"} autoSize={{ minRows: 7, maxRows: 7 }}/>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        htmlType="submit"
        className="create-form__button"
      >
        送出
      </Button>
    </div>
  );
};
export default CreateClassCard;
