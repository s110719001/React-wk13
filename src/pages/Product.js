import { Layout } from 'antd';
import { Link } from "react-router-dom";
import products from "../json/products.json";
import ProductDetail from "../components/ProductDetail";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";

const { Header, Content, Footer } = Layout;

export default function Product() {
    
    return (
       <Layout className="container">
            <Header className="layout-header">
               <AppHeader></AppHeader>
            </Header>
            <Content className="layout-content">
                <ProductDetail/>
            </Content>
            <Footer className="layout-footer">
               <AppFooter></AppFooter>
            </Footer>
       </Layout>
    );
 }