import { useState } from "react";
import { formatMoney } from "../../utils/money";
import "./CartItemDetails.css";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart }) {
  // Exercise 8f
  const [isUpdating, setUpdate] = useState(false);
  // Exercise 8g: create a state for the quantity
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateCartItem = async () => {
    if (isUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setQuantity(false);
    } else {
      setUpdate(true);
    }
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  function updateQuantityInput(event) {
    setQuantity(event.target.value);
  }

  const updateQuantitykeyDown = (event) => {
    if(event.key === 'Enter'){
      updateCartItem();
    }

    if(event.key === 'Escape'){
      setQuantity(cartItem.quantity);
      setUpdate(false);
    }
  } 

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdating ? (
              <>
                <input
                  className="textbox"
                  type="text"
                  value={Number(quantity)}
                  onChange={updateQuantityInput}
                  onKeyDown={updateQuantitykeyDown}
                />
                <span className="quantity-label">{cartItem.quantity}</span>
              </>
            ) : (
              <>
                <span className="quantity-label">{cartItem.quantity}</span>
              </>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
