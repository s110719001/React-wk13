import { Layout } from "antd";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";
import ShippingAddressCard from "../components/ShippingAddressCard";
const { Header, Content, Footer } = Layout;

function Shipping() {
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title="Shipping Page"/>
        </Header>
        <Content className="layout-content">
          <ShippingAddressCard />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Shipping;
