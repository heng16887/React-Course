import { it, expect, describe, vi, beforeEach } from "vitest";
// within() = lets us find things within a specific element
import { render, screen, within } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
// MemoryRouter = specifically for testing
import { MemoryRouter } from "react-router";
// screen = check the fake web page
// import userEvent from "@testing-library/user-event";
import axios from "axios";
import { HomePage } from "./HomePage";

vi.mock('axios');
// this is where mock the implementation starts
// Mock the implementation = make the mock do whatever we want
describe('HomePage Component', () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if(urlPath === '/api/products'){
        return {
          data: [{
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
              stars: 4.5,
              count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            image: "images/products/intermediate-composite-basketball.jpg",
            name: "Intermediate Size Basketball",
            rating: {
              stars: 4,
              count: 127
            },
            priceCents: 2095,
            keywords: ["sports", "basketballs"]
          }]
        };
      }
    });
  });

  it('displays the products correctly', async() => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart}/>
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container');

    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs",
      )
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText("Intermediate Size Basketball"),
    ).toBeInTheDocument();
  });

  // 9g: testing add to cart button whether it work or not
  it('work on add to cart button', async() => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const productContainers = await screen.findAllByTestId('product-container');
    const selectQuantity = await screen.findAllByTestId("quantitySelector");
    
    // 9h: test to update the quantity selector
    await user.selectOptions(selectQuantity[0], "2");
    await user.selectOptions(selectQuantity[1], "3");

    await user.click(
      within(productContainers[0]).getByTestId("add-to-cart-button")
    );

    await user.click(
      within(productContainers[1]).getByTestId("add-to-cart-button"),
    );

    expect(axios.post).toHaveBeenNthCalledWith(1, "/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    });
    expect(axios.post).toHaveBeenNthCalledWith(2, "/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
    });
    
    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});
