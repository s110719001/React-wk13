import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/index";
import { setProductDetail } from "../actions/index";
import { Layout, Button } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import Feeder from "../components/Feeder";

const { Header, Content, Footer } = Layout;

function Feed() {
  const  { dispatch, state:{productDetail:{product,avaliable}}} = useContext(StoreContext)
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title="Feed JSON Page" />
        </Header>
        <Content className="layout-content">
          <Feeder />
          <Button onClick={() => {setProductDetail(dispatch,"1",1);
          console.log(product);
        }}>查詢商品</Button>
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Feed;
