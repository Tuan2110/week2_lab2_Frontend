import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { Test } from './pages/shop/test';
import Login from './pages/login/login';
import { ShopContextProvider } from './context/shop-context';
import Checkout from './pages/checkout/checkout';
import { useState } from 'react';
import { Managerment } from './management/management';
import { Product } from './management/product';
import { Order } from './management/Order';
import { UpdatePrice } from './management/updateprice';
import { Chart } from './management/chart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("customer_id"));
  const handleLogOut = () => {
    localStorage.removeItem("customer_id");
    setIsLoggedIn(false);
  }
    return (
    <div className="App">
        <ShopContextProvider>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
          <Routes>
            <Route path="/home" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/managerment' element={<Managerment/>} />
            <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/mng-product' element={<Product />} />
            <Route path='/mng-order' element={<Order />} />
            <Route path='/updateprice' element={<UpdatePrice />} />
            <Route path='/chart' element={<Chart />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
