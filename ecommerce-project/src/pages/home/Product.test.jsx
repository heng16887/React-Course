import { it, expect, describe, vi, beforeEach} from "vitest";
import {render, screen} from '@testing-library/react';
// screen = check the fake web page
import userEvent from '@testing-library/user-event';
import axios from "axios";
import { Product } from "./Product";

vi.mock('axios');

describe('Product component', () => {
  // to testing component, we need to use render()
  // render() = display the component on the page

  // However, we need to install a packages 'npm install --save-dev @testing-library/react@16.3.0 @testing-library/jest-dom@6.6.3 @testing-library/user-event@14.6.1 jsdom@26.1.0'
  // and then config and set up the file (create a file[vitest.config.js] and [setupTests.js])

  // MOCK = creaet a fake version of this function
  let product;
  // vi.fn() = creaet a fake function that doesn't do anything
  let loadCart;

  beforeEach(() => {
    product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
    loadCart = vi.fn();
  });

  // this is Integration test
  it("displays the product details correctly", () => {
    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars-image")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  // this is user interaction test
  it("adds a product to the cart", async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");

    await user.click(addToCartButton); // this line is asychronous code (it returns a Promise)
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
    });
    expect(loadCart).toHaveBeenCalled();
  });

  // 9c: add test id and check the quantity selector
  it('can select a quantity', () => {
    render(<Product product={product} loadCart={loadCart}/>)

    const selectQuantity = screen.getByTestId('quantitySelector');
    
    expect(selectQuantity).toHaveValue('1');
  });
});
