import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router";
import axios from "axios";

export function PaymentSummary({paymentSummary, loadCart}) {
  // useNavigate() = lets us navigate to (go to) another page in our app
  const navigate = useNavigate(); // --> its give or return as a function

  const createOrder = async () => {
    await axios.post('/api/orders');
    await loadCart();

    navigate('/orders'); // --> this is the result from UseNavigate
  }; 

  return (
    <div className="payment-summary"
    data-testid="payment-summary-container">
      <div className="payment-summary-title">Payment Summary</div>

      {paymentSummary && (
        <>
          <div className="payment-summary-row"
          data-testid="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row"
          data-testid="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row"
          data-testid="payment-summary-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row"
          data-testid="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row"
          data-testid="payment-summary-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button className="place-order-button button-primary"
          data-testid="place-order-button"
          onClick={createOrder}>
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
