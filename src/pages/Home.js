import { useContext, useEffect } from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import { StoreContext } from "../store/index";
import ProductList from "../components/ProductList";
import SearchBlock from "../components/SearchBlock";
import WeeklyBlock from "../components/WeeklyBlock";
import AppFooter from "../components/Footer";
import AppHeader from "../components/Header";

import { setPage } from "../actions";

const { Header, Content, Footer } = Layout;

export default function Home(){
    const { state:{ page:{ products }}, dispatch } = useContext(StoreContext);
    useEffect(() => {
        const url = window.location.pathname;
        setPage(dispatch, url)
      }, []);
    return(
        <Layout className="container">
            <Header className="layout-header">
                <AppHeader></AppHeader>
            </Header>
            <Content className="layout-content">
                <div className="block" style={{padding:"0"}}>
                    <SearchBlock></SearchBlock>
                </div>
                <div className="block">
                    <div className="block-title">每週精選</div>
                    <div className="block-bar"></div>
                    <WeeklyBlock></WeeklyBlock>
                </div>
                <div className="block productlist-block">
                    <div className="block-title">熱門課程</div>
                    <div className="block-bar"></div>
                    <ProductList products={products} />
                </div>
            </Content>
            <Footer className="layout-footer">
                <AppFooter></AppFooter>
            </Footer>
        </Layout>
    )
}