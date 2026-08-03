// 9i: create a test for PaymentSummary component
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { PaymentSummary } from './PaymentSummary';
import { Location } from './Location';
import { MemoryRouter } from "react-router";
import { formatMoney } from "../../utils/money";
import axios from "axios";

vi.mock('axios');

describe('PaymentSummary Component', () => {
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    paymentSummary = {
      "totalItems": 2,
      "productCostCents": 2180,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 2180,
      "taxCents": 218,
      "totalCostCents": 2398
    }
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

  it('work on Place Order button', async() => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        <Location />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const paymentSummaryContainer = screen.getByTestId('payment-summary-container');
    
    await user.click(
      within(paymentSummaryContainer).getByTestId("place-order-button")
    );

    const urlPath = screen.getByTestId('url-path');
    expect(urlPath).toHaveTextContent('/orders');

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalledTimes(1);
  });
});