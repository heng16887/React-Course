import axios from "axios";
import { useEffect } from "react";
import { Header } from "../../components/Header";

import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart, orders, setOrders }) {
  
  // Exercise 7a
  useEffect(() => {
    const orderData = async () => {
      const response = await axios.get("/api/orders?expand=products");
  
      setOrders(response.data);
    } 
    orderData();
  }, [setOrders]);

  return (
    <>
      <link rel="icon" href="/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
