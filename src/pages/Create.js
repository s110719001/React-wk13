import { Layout } from "antd";
import CreateClassCard from "../components/CreateClassCard";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";
const { Header, Content, Footer } = Layout;

function Payment() {
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title="Payment Method Page" step1 step2 step3 />
        </Header>
        <Content className="layout-content">
           <CreateClassCard/>
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Payment;
