import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({cart}) {
  // Exercise 7k
  const [order, setOrder] = useState(null);
  const { orderId, productId } = useParams();

  useEffect(() => {
    const orderData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    orderData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.product.id === productId;
  });
  // Exercise 7l: get the total time for delivery
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  // Exercise 7l: get the time passed since the order was placed
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  // Exercise 7l: calculate the percentage of delivery progress
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if(deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  return (
    <>
      <link rel="icon" href="/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(order.deliveryDate).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"
                 style={{width: `${deliveryPercent}%`}}>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}