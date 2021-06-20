import { Button, Layout } from "antd";
import CreateClassCard from "../components/CreateClassCard";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";
const { Header, Content, Footer } = Layout;

function Payment() {
  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title="Create Class Page"/>
      </Header>
      <Content className="layout-content">
          <CreateClassCard/>
      </Content>
      <Footer className="layout-footer">
        <AppFooter />
      </Footer>
    </Layout>
  );
}

export default Payment;
