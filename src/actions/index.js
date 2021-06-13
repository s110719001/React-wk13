import product from "../json/products.json";

import { 
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,

    //Feed 資料到後端
    BEGIN_PRODUCTS_FEED,
    SUCCESS_PRODUCTS_FEED,
    FAIL_PRODUCTS_FEED,

    //取得商品渲染畫面
    SET_PAGE_TITLE,
    SET_PAGE_CONTENT,
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

      //付款地址與方式
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,

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

import {
  feedProducts,
  signInWithEmailPassword,
  registerWithEmailPassword,
  signOut,
  updateUserInfoApi,
  checkLoginApi,
  getProductById,
  getProducts,
  createOrderApi,
  getOrderById,
  getOrderByUser,
} from "../api";

export const CartItemAdd = ( dispatch, product ) =>{
    const item = {
        id: product.id,
        title: product.class_name,
        image: product.class_cover,
        price: product.class_price,
    };
    dispatch({
        type: ADD_CART_ITEM,
        payload: item,
    });
};

export const cartItemRemove = (dispatch, productId) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: productId,
    });
  };

export const feedJSONToFirebase = async (dispatch) => {
  dispatch({ type: BEGIN_PRODUCTS_FEED });
  try {
    await feedProducts();
    dispatch({ type: SUCCESS_PRODUCTS_FEED });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_FEED, payload: error });
  }
}
//取得商品資料
export const setProductDetail = async (dispatch, productId, avaliable) => {
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  try {
    const product = await getProductById(productId);
    if (avaliable === 0)
      dispatch({
        type: SET_PRODUCT_DETAIL,
        payload: {
          product,
        }
      })
    else
      dispatch({
        type: SET_PRODUCT_DETAIL,
        payload: {
          product,
          avaliable,
        }
      })
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
}
export const setPage = async (dispatch, url) => {
  let products = [];
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  try {
    products = await getProducts(url);
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { products },
    });
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
}
//login
export const loginToFirebase = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_LOGIN_REQUEST });
  try {
    const user = await signInWithEmailPassword(userInfo.email, userInfo.password);
    dispatch({
      type: SUCCESS_LOGIN_REQUEST,
      payload: user.user.providerData[0],
    })
    return user;
  } catch (e) {
    dispatch({
      type: FAIL_LOGIN_REQUEST,
      payload: e.message
    })
    console.log(e)
    return null;
  }
}

export const rememberLoginUser = (dispatch, remember) => {
  dispatch({
    type: REMEMBER_LOGIN,
    payload: remember,
  })
}

export const registerToFirebase = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_REGISTER_REQUEST });
  try {
    const user = await registerWithEmailPassword(userInfo.email, userInfo.password, userInfo.name);
    console.log(user)
    dispatch({
      type: SUCCESS_REGISTER_REQUEST,
      payload: user.providerData[0],
    })
    return user;
  } catch (e) {
    dispatch({
      type: FAIL_REGISTER_REQUEST,
      payload: e.message
    })
    console.log(e)
    return null;
  }
}

export const updateUserInfo = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_UPDATE_USERINFO });
  try {
    const user = await updateUserInfoApi(
      userInfo.email,
      userInfo.password,
      userInfo.name
    );
    dispatch({
      type: SUCCESS_UPDATE_USERINFO,
      payload: user.providerData[0],
    });
  } catch (e) {
    dispatch({
      type: FAIL_UPDATE_USERINFO,
      payload: e.message,
    });
    console.log(e);
  }
};

export const logoutFromFirebase = async (dispatch) => {
  signOut();
  dispatch({ type: LOGOUT_REQUEST });
}
export const checkLogin = (dispatch) => {
  const isLogin = checkLoginApi();
  if(!isLogin) {
    localStorage.removeItem('orderInfo')
    dispatch({ type: LOGOUT_REQUEST });    
  }
  return isLogin;
};

//Order
export const createOrder = async (dispatch, cart) => {
  dispatch({ type: BEGIN_ORDER_CREATE });
  try {
    const item = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    };    
    const orderInfo = await createOrderApi(item);
    dispatch({ 
      type: SUCCESS_ORDER_CREATE, 
      payload: orderInfo 
    });
    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    localStorage.removeItem("cartItems");
    return orderInfo;
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_ORDER_CREATE, payload: error });
    return null;
  }  
};



export const requestOrderDetail = async (dispatch, orderId) => {
  dispatch({ type: BEGIN_ORDER_DETAIL });
  try {
    const order = await getOrderById(orderId);
    dispatch({ 
      type: SUCCESS_ORDER_DETAIL,
      payload: order
    });
  } catch (error) {
    dispatch({ 
      type: FAIL_ORDER_DETAIL, 
      payload: error 
    });
  }
}

export const resetOrder = (dispatch) => {
  dispatch({ type: RESET_ORDER });
}

export const getUserOrders = async (dispatch) => {
  dispatch({ type: SEARCH_USER_ORDERS });
  try {
    const orders = await getOrderByUser();
    dispatch({ 
      type: SUCCESS_SEARCH,
      payload: orders
    });
  }catch (error) {
    dispatch({ 
      type: FAIL_SEARCH, 
      payload: error 
    });
  }
}

//Payment
export const saveShippingAddress = (dispatch, shippingAddress) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
}

export const savePaymentMethod = (dispatch, paymentMethod) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod.paymentMethod,
  });
}
