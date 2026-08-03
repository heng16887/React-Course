import { Fragment } from "react";
import { Link } from "react-router";
import { OrderHeader } from "./OrderHeader";
import { OrderDetails } from "./OrderDetails";

export function OrdersGrid({ orders, loadCart}) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order}/>

            <OrderDetails order={order} loadCart={loadCart}/>            
          </div>
        );
      })}
    </div>
  );
}
