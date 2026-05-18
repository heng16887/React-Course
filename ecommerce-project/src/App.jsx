import { Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
// Exercise 6B
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';  
import { NotFoundPage } from './components/NotFoundPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<OrdersPage />} />
      <Route path='tracking' element={<TrackingPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App
