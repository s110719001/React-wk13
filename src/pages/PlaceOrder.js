import { Layout } from "antd";
import ShippingHeader from "../components/ShippingHeader";
import PlaceOrderCard from "../components/PlaceOrderCard";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";
const { Header, Content, Footer } = Layout;

function PlaceOrder() {
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title="Place Order Page" step1 step2 step3 step4 />
        </Header>
        <Content className="layout-content">
           <PlaceOrderCard />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default PlaceOrder;
