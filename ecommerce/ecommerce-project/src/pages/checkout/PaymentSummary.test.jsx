// 9i: create a test for PaymentSummary component
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { PaymentSummary } from './PaymentSummary';
import { Location } from './Location';
import { MemoryRouter, useLocation } from "react-router";
import { formatMoney } from "../../utils/money";
import axios from "axios";

vi.mock('axios');

describe('PaymentSummary Component', () => {
  let loadCart;
  let paymentSummary;
  let user;

  beforeEach(() => {
    paymentSummary = {
      "totalItems": 2,
      "productCostCents": 2180,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 2180,
      "taxCents": 218,
      "totalCostCents": 2398
    }

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('check the dollar amount', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
      </MemoryRouter>
    );

    const paymentSummaryRows = screen.getAllByTestId('payment-summary-row');

    // expect(paymentSummaryRows.length).toBe(5); // true

    expect(paymentSummaryRows[0]).toHaveTextContent(`Items (${paymentSummary.totalItems}):${formatMoney(paymentSummary.productCostCents)}`);

    expect(paymentSummaryRows[1]).toHaveTextContent(
      `Shipping & handling:${formatMoney(paymentSummary.shippingCostCents)}`,
    );

    expect(paymentSummaryRows[2]).toHaveTextContent(
      `Total before tax:${formatMoney(paymentSummary.totalCostBeforeTaxCents)}`,
    );

    expect(paymentSummaryRows[3]).toHaveTextContent(
      `Estimated tax (10%):${formatMoney(paymentSummary.taxCents)}`,
    );

    expect(paymentSummaryRows[4]).toHaveTextContent(
      `Order total:${formatMoney(paymentSummary.totalCostCents)}`,
    );
  
  });
  // 9j: create a test for Place Order button
  it('work on Place Order button', async() => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    const urlPath = screen.getByTestId('url-path');
    expect(urlPath).toHaveTextContent('/orders');
  });
});