import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
// Exercise 6B
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';  
import { NotFoundPage } from './components/NotFoundPage';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // TODO: Fetch cart items from the backend to determine which products have been added to the cart
    axios.get("/api/cart-items").then((response) => {
      setCart(response.data);
    });
  });

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path='checkout' element={<CheckoutPage cart={cart}/>} />
      <Route path='orders' element={<OrdersPage />} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App
