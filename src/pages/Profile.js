import { Layout } from "antd";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import OrderCard2 from "../components/OrderCard2";
import RecommendCard from "../components/RecommendCard";

const { Header, Content, Footer } = Layout;

function Profile() {
  return (
    <Layout className="container">
        <Header className="layout-header">
          <AppHeader title="Profile Page" />
        </Header>
        <Content className="layout-content profile-layout">
          <ProfileCard />
          <OrderCard2 />
          <RecommendCard />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
    </Layout>
  );
}

export default Profile;
