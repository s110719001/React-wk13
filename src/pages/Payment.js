import { Layout } from "antd";
import ShippingHeader from "../components/ShippingHeader";
import PaymentMethodCard from "../components/PaymentMethodCard";
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
           <PaymentMethodCard />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Payment;
