// 9i: create a test for PaymentSummary component
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentSummary } from './PaymentSummary';
import { MemoryRouter } from "react-router";
import { formatMoney } from "../../utils/money";
// import axios from "axios";

vi.mock('axios');

describe('PaymentSummary Component', () => {
  let loadCart;
  let paymentData;

  beforeEach(() => {
    loadCart = vi.fn();

    paymentData = {
      "totalItems": 2,
      "productCostCents": 2180,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 2180,
      "taxCents": 218,
      "totalCostCents": 2398
    }
  })

  it('check the dollar amount', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentData} loadCart={loadCart}/>
      </MemoryRouter>
    );

    const paymentSummaryRows = screen.getAllByTestId('payment-summary-row');

    // expect(paymentSummaryRows.length).toBe(5); // true

    expect(paymentSummaryRows[0]).toHaveTextContent(`Items (${paymentData.totalItems}):${formatMoney(paymentData.productCostCents)}`);

    expect(paymentSummaryRows[1]).toHaveTextContent(
      `Shipping & handling:${formatMoney(paymentData.shippingCostCents)}`,
    );

    expect(paymentSummaryRows[2]).toHaveTextContent(
      `Total before tax:${formatMoney(paymentData.totalCostBeforeTaxCents)}`,
    );

    expect(paymentSummaryRows[3]).toHaveTextContent(
      `Estimated tax (10%):${formatMoney(paymentData.taxCents)}`,
    );

    expect(paymentSummaryRows[4]).toHaveTextContent(
      `Order total:${formatMoney(paymentData.totalCostCents)}`,
    );
  
  });
});