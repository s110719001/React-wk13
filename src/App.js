import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StoreProvider } from "./store/index";
import './App.css';
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/product/cart" component={Cart} />
          <Route path="/admin/feed-products" component={Feed} />
          <Route path="/product/:productId" component={Product} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
