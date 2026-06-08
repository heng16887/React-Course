import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/home/HomePage';
// Exercise 6B
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';  
import { NotFoundPage } from './components/NotFoundPage';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadCart = async () => {
    // TODO: Fetch cart items from the backend to determine which products have been added to the cart
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  }
  useEffect(() => {
    loadCart();
  });

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path='orders' element={<OrdersPage cart={cart} orders={orders} setOrders={setOrders}/>} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
      <Route path='*' element={<NotFoundPage cart={cart}/>} />
    </Routes>
  );
}

export default App
