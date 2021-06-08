import { createContext, useReducer } from "react";
import products from "../json/products.json";
import useReducerWithThunk from 'use-reducer-thunk';
import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    //Feed 資料到後端
    BEGIN_PRODUCTS_FEED,
    SUCCESS_PRODUCTS_FEED,
    FAIL_PRODUCTS_FEED,
    //取得商品
    SET_PRODUCT_DETAIL,
    BEGIN_PRODUCTS_REQUEST,
    SUCCESS_PRODUCTS_REQUEST,
    FAIL_PRODUCTS_REQUEST,
    //登入
    BEGIN_LOGIN_REQUEST,
    SUCCESS_LOGIN_REQUEST,
    FAIL_LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REMEMBER_LOGIN,
    //註冊
    BEGIN_REGISTER_REQUEST,
    SUCCESS_REGISTER_REQUEST,
    FAIL_REGISTER_REQUEST,
    //使用者資料
    BEGIN_UPDATE_USERINFO,
    SUCCESS_UPDATE_USERINFO,
    FAIL_UPDATE_USERINFO,
} from "../utils/constants";

export const StoreContext = createContext();
let cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

let shippingAddress;
try {
  shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
} catch(e) {
  shippingAddress = {};
}

let userInfo;
try {
  userInfo =  JSON.parse(localStorage.getItem("userInfo"));
} catch(e) {
  userInfo = null;
}

let orderInfo_order;
try {
  orderInfo_order = JSON.parse(localStorage.getItem('orderInfo'));
} catch(e) {
  orderInfo_order = { id: "" };
}
    

const initialState = {
    page: {
       products,
    },
    productDetail: {
        product: {},
        qty: 1,
      },
    requestProducts: {
      loading: false,
      error: null,
    },
    navBar: {
       activeItem: "/",
    },
    cartItems: [],
    feedProducts: {
        loading: false,
        error: null,
      },
    userSignin: {
      loading: false,
      userInfo,
      remember: true,
      error: "",
    },
    userRegister: {
      loading: false,
      userInfo: null,
      error: "",
    },
 };



function reducer(state, action){
    switch(action.type){
        case ADD_CART_ITEM:
            const item = action.payload;
            const product = state.cartItems.find((x) => x.id === item.id);
            if (product) {
            cartItems = state.cartItems.map((x) =>
                x.id === product.id ? item : x
            );
            return { ...state, cartItems };
            }
            cartItems = [...state.cartItems, item];
            return { ...state, cartItems };
        case REMOVE_CART_ITEM:
            cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            return { ...state, cartItems };
        //Feed 資料到後台
        case BEGIN_PRODUCTS_FEED:
            return {
              ...state,
              feedProducts: { ...state.feedProducts, loading: true },
            };
        case SUCCESS_PRODUCTS_FEED:
          return {
            ...state,
            feedProducts: { ...state.feedProducts, loading: false },
          };
        case FAIL_PRODUCTS_FEED:
          return {
            ...state,
            feedProducts: {
              ...state.feedProducts,
              loading: false,
              error: action.payload,
            },
        };
        //取得商品
        case SET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: { ...state.productDetail, ...action.payload },
            };
        case BEGIN_PRODUCTS_REQUEST:
            return {
                ...state,
                requestProducts: { ...state.requestProducts, loading: true },
            };
        case SUCCESS_PRODUCTS_REQUEST:
            return {
                ...state,
                requestProducts: { ...state.requestProducts, loading: false },
            };
        case FAIL_PRODUCTS_REQUEST:
            return {
                ...state,
                requestProducts: {
                ...state.requestProducts,
                loading: false,
                error: action.payload,
                },
            };
        //登入
        case BEGIN_LOGIN_REQUEST:
            return { ...state, userSignin: { ...state.userSignin, loading: true } };
        case SUCCESS_LOGIN_REQUEST:
            return {
                ...state,
                userSignin: {
                ...state.userSignin,
                loading: false,
                userInfo: action.payload,
                error: "",
                },
            };
        case FAIL_LOGIN_REQUEST:
            return {
                ...state,
                userSignin: {
                ...state.userSignin,
                loading: false,
                userInfo: null,
                error: action.payload,
                },
            };
        case LOGOUT_REQUEST:
            cartItems = [];
            return {
                ...state,
                userSignin: {
                ...state.userSignin,
                userInfo: null,
                },
            };
        case REMEMBER_LOGIN:
            return {
                ...state,
                userSignin: {
                ...state.userSignin,
                remember: action.payload,
                },
            };
        //使用者資訊
        case BEGIN_UPDATE_USERINFO:
            return { ...state, userSignin: { ...state.userSignin, loading: true } };
        case SUCCESS_UPDATE_USERINFO:
            return {
                ...state,
                userSignin: {
                ...state.userSignin,
                loading: false,
                userInfo: action.payload,
                error: "",
                },
            };
        case FAIL_UPDATE_USERINFO:
            return {
                ...state,
                userSignin: {
                ...state.userSignin,
                loading: false,
                error: action.payload,
                },
            };
        //註冊
        case BEGIN_REGISTER_REQUEST:
            return {
                ...state,
                userRegister: { ...state.userRegister, loading: true },
            };
        case SUCCESS_REGISTER_REQUEST:
            return {
                ...state,
                userRegister: {
                ...state.userRegister,
                loading: false,
                userInfo: action.payload,
                error: "",
                },
                userSignin: {
                ...state.userSignin,
                userInfo: action.payload,
                },
            };
        case FAIL_REGISTER_REQUEST:
            return {
                ...state,
                userRegister: {
                ...state.userRegister,
                loading: false,
                userInfo: null,
                error: action.payload,
                },
            };
        default:
            return state;
        
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducerWithThunk(reducer, initialState, "example");
    const value = {state, dispatch};
    return(
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    )
}