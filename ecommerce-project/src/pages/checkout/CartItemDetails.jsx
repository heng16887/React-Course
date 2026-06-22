import { useState } from "react";
import { formatMoney } from "../../utils/money";
import './CartItemDetails.css'
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart })
{
  const [updateQuantity, setUpdatedQuantity] = useState(false);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }; 

  // Exercise 8f
  function updateQuantityInput(){
    setUpdatedQuantity(!updateQuantity);
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
            {updateQuantity ? (
              <>
                <input className="textbox" type="text" />
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
            onClick={updateQuantityInput}
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