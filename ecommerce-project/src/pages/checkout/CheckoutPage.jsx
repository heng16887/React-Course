import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import "./CheckoutPage.css";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from './PaymentSummary'

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios
        .get("/api/delivery-options?expand=estimatedDeliveryTime");
      setDeliveryOptions(response.data);
    }
    fetchCheckoutData();
  }, []);

  // Exercise 8b: seperate the code that reloads teh payment summary
  useEffect(() => {
    const fetchPaymentData = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    }
    fetchPaymentData();
  }, [cart]);

  return (
    <>
      <link rel="icon" href="/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}
