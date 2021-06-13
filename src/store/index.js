import { createContext } from "react";

import useReducerWithThunk from 'use-reducer-thunk';
import {
    SET_PAGE_TITLE,
    SET_PAGE_CONTENT,
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    //付款地址與方式
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    //Feed 資料到後端
    SET_PRODUCT_DETAIL,
    BEGIN_PRODUCTS_FEED,
    SUCCESS_PRODUCTS_FEED,
    FAIL_PRODUCTS_FEED,
    //取得商品
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
    //訂單建立
    BEGIN_ORDER_CREATE,
    SUCCESS_ORDER_CREATE,
    FAIL_ORDER_CREATE,
    RESET_ORDER,
    BEGIN_ORDER_DETAIL,
    SUCCESS_ORDER_DETAIL,
    FAIL_ORDER_DETAIL,
    //查詢訂單
    SEARCH_USER_ORDERS,
    SUCCESS_SEARCH,
    FAIL_SEARCH,
} from "../utils/constants";

export const StoreContext = createContext();
let cartItems;
try{
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (!cartItems) cartItems = [];
} catch(e) {
  cartItems = [];
}
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
    allProducts: [],
    page: {
       title: "",
       products: [],
    },
    productDetail: {
        product: {},
        avaliable: 1,
      },
    requestProducts: {
      loading: false,
      error: null,
    },
    cart: {
        cartItems,
        shippingAddress,
        paymentMethod: 'Google',
      },
    feedProducts: {
        loading: false,
        error: null,
      },
    //登入註冊
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
    //訂單
    orderInfo: {
      loading: false,
      order: orderInfo_order,
      success: false,
      error: null,
    },
    orderDetail: {
      loading: true,
      order: { cartItems: []},
      error: null,
    },
    userOrders: {
      loading: false,
      orders: [],
      error: "",
    }
 };



function reducer(state, action){
    switch(action.type){
        case SET_PAGE_TITLE:
            return {
                ...state,
                page: {
                ...state.page,
                title: action.payload,
                },
            };
        case SET_PAGE_CONTENT:
            return {
                ...state,
                page: {
                ...state.page,
                ...action.payload,
                },
            };
        case ADD_CART_ITEM:
            const item = action.payload;
            const product = state.cart.cartItems.find((x) => x.id === item.id);
            if (product) {
              cartItems = state.cart.cartItems.map((x) =>
                x.id === product.id ? item : x
              );
              return { ...state, cart: { ...state.cart, cartItems } };
            }
            cartItems = [...state.cart.cartItems, item];
            return { ...state, cart: { ...state.cart, cartItems } };
        case REMOVE_CART_ITEM:
            cartItems = state.cart.cartItems.filter((x) => x.id !== action.payload);
            return { ...state, cart: { ...state.cart, cartItems } };
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
        //付款方式
        case SAVE_SHIPPING_ADDRESS:
            console.log('action.payload.shippingAddress = ')
            console.log(action.payload)
            return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
        case SAVE_PAYMENT_METHOD:
          return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };
        //建立訂單
        case BEGIN_ORDER_CREATE:
            return {
              ...state,
              orderInfo: {
                ...state.orderInfo,
                loading: true,
                success: false,
              }
            };
        case SUCCESS_ORDER_CREATE:
          return {
            ...state,
            orderInfo: {
              ...state.orderInfo,
              loading: false,
              order: action.payload,
              success: true,
              error: null,
            },
          };
        case FAIL_ORDER_CREATE:
          return {
            ...state,
            orderInfo: {
              ...state.orderInfo,
              loading: false,
              order: { id: "" },
              success: false,
              error: action.payload,
            },
          };
        case RESET_ORDER:
          return {
            ...state,
            orderInfo: {
              ...state.orderInfo,
              loading: false,
              order: { id: "" },
              success: false,
            },
          };
        case BEGIN_ORDER_DETAIL:
          return {
            ...state,
            orderDetail: {
              ...state.orderDetail,
              loading: true,
            }
          };
        
        case SUCCESS_ORDER_DETAIL:
          return {
            ...state,
            orderDetail: {
              ...state.orderDetail,
              loading: false,
              order: action.payload,
            },
          };
        case FAIL_ORDER_DETAIL:
          return {
            ...state,
            orderDetail: {
              ...state.orderDetail,
              loading: false,
              error: action.payload,
            },
          };
        //查詢訂單
        case SEARCH_USER_ORDERS:
            return {
              ...state,
              userOrders: { ...state.userOrders, loading: true },
            };
        case SUCCESS_SEARCH:
          return {
            ...state,
            userOrders: { 
              ...state.userOrders,
              loading: false,
              orders: action.payload,
              error: "",
            },
          };
        case FAIL_SEARCH: 
          return {
            ...state,
            userOrders: { 
              ...state.userOrders,
              loading: false,
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