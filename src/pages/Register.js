import { Layout } from "antd";
import * as QueryString from "query-string";

import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import RegisterCard from "../components/RegisterCard";

const { Header, Content, Footer } = Layout;

function Register(props) {
  const { redirect } = QueryString.parse(props.location.search);
  return (
    <Layout className="container">
        <Header className="layout-header">
          <AppHeader title="Register Page" />
        </Header>
        <Content className="layout-content">
          <RegisterCard redirect={redirect} />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
    </Layout>
  );
}

export default Register;
