import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Card } from "antd";
import AddToCart from "./AddToCart";
import { StoreContext } from "../store"
import { setProductDetail } from "../actions";

export default function ProductItem({ product }){
    const { dispatch } = useContext(StoreContext);

    return(
            <Link className="card" 
                    onClick={() => {setProductDetail(dispatch, product.id, 1);}} 
                    to={`/product/${product.id}`}>
                <Card 
                hoverable
                className="productlist-card bg-card"
                cover={<img style={{borderRadius:'20px'}} src={product.image}/>}
                >   
                    <div className="productlist-card-body">
                        <p className="productlist-title">{product.title}</p>
                        <p className="productlist-price">NT$ {product.price}</p>
                        <p className="productlist-lecturer">{product.lecturer}</p>
                        <p className="productlist-student">
                            <img
                            className="productlist-person-icon"
                            src="/image/list/person.png"
                            />
                            {product.student}人
                        </p>
                        <div className="productlist-rating">
                            <img
                            style={{width:'178px',height:'29px'}}
                            src="/image/rating.png"
                            />
                            <p className="productlist-rating-comments">{product.comments}個評價</p>
                        </div>
                        <div className="productlist-bar"></div>
                        <Link className="productlist-btn"
                                onClick={() => {setProductDetail(dispatch, product.id, 1);}} 
                                 to="/">
                            <AddToCart product={product}></AddToCart>
                        </Link>
                    </div>
                </Card>
            </Link>
    )
}