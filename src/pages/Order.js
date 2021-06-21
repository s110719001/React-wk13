import { Layout } from "antd";
import OrderCard from "../components/OrderCard";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
const { Header, Content, Footer } = Layout;

function Order({ match }) {
   return (
    <Layout className="container">
        <Header className="layout-header">
          <AppHeader title={`Order: ${match.params.orderId}`} />
        </Header>
        <Content className="layout-content">
           <OrderCard orderId={match.params.orderId} />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
    </Layout>
  );
}

export default Order;
