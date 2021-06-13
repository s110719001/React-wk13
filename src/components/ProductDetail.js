import { Link } from "react-router-dom";
import { Button, Select, Spin } from "antd";
import React, { useState, useContext } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../store"
import { setProductDetail } from "../actions";

const { Option } = Select;
export default function ProductDetail(){
    const { state: { productDetail: { product, avaliable }, requestProducts: { loading } }, dispatch } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;
    
    return(
        <>
         {loading
            ? (
               <div className="spinner-wrap">
                  <Spin indicator={antIcon} className="spinner" />
               </div>
            ) : (
            <div className="product">
                <div className="product-intro text-color-main">
                    <img
                    className="product-cover"
                    src={product.class_cover}
                    />
                    <div className="product-info-container">
                        <p className="product-name">{product.class_name}</p>
                        <p className="product-price">{product.class_price}</p>
                        <p className="product-bought">{product.class_bought}</p>
                        <p className="product-time">{product.class_time}</p>
                        <Select style={{marginRight:'12px'}} defaultValue={1}
                        onChange={val => setProductDetail(dispatch, product.id, val, product.avaliable)}>
                            {[...Array(product.avaliable).keys()].map((x) =>(
                                <Option key={x+1} value={x+1}>
                                    {x+1}
                                </Option>
                            ))} 
                        </Select>
                        <div>{avaliable}人要上課</div>
                        <Button className="product-addtocart-btn bg-main text-white">加入購物車</Button>
                        
                    </div>
                </div>
                <div className="product-phone-block-one">
                    <div className="product-phone-block">課程介紹</div>
                    <div className="product-phone-bar"></div>
                </div>
                
                <div className="product-btns bg-container">
                    <Button autoFocus type="text" className="product-btn text-color-main bg-container">課程介紹</Button>
                    <Button type="text" className="product-btn text-color-main bg-container">內容試閱</Button>
                    <Button type="text" className="product-btn text-color-main bg-container">Q&A</Button>
                </div>
                <div className="product-content">
                    {product.class_introduction.map(introdetail => (
                        <div className="product-content-detail">{introdetail}</div>
                    ))}
                    {product.class_image.map(image => (
                        <img
                        className="product-content-image"
                        src={image}
                        />
                    ))}
                    
                </div>
                <div className="product-phone-block-two">
                    <div className="product-phone-block">內容試閱</div>
                    <div className="product-phone-bar"></div>
                    <img
                    className="block-two-content"
                    src="/image/products/video.png"
                    />
                </div>
                <div className="product-phone-block-three">
                    <div className="product-phone-block">Q&A</div>
                    <div className="product-phone-bar"></div>
                    <img
                    className="block-three-content"
                    src="/image/products/q&a.png"
                    />
                </div>
            </div>
            )
            }
        </>
    );
}