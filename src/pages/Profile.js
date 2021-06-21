import { Layout } from "antd";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import OrderCard from "../components/OrderCard";
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
          <OrderCard />
          <RecommendCard />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
    </Layout>
  );
}

export default Profile;
