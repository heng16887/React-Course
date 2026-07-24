import { it, expect, describe, vi} from "vitest";
import {render, screen} from '@testing-library/react';
// screen = check the fake web page
import { Product } from "./Product";

describe('Product component', () => {
  it('displays the product details correctly', () => {
    // to testing component, we need to use render()
    // render() = display the component on the page

    // However, we need to install a packages 'npm install --save-dev @testing-library/react@16.3.0 @testing-library/jest-dom@6.6.3 @testing-library/user-event@14.6.1 jsdom@26.1.0'
    // and then config and set up the file (create a file[vitest.config.js] and [setupTests.js])

    const product = {
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
    // MOCK = creaet a fake version of this function
    // vi.fn() = creaet a fake function that doesn't do anything
    const loadCart = vi.fn();
    render(<Product product={product} loadCart={loadCart}/>);

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

    expect(
      screen.getByText('87')
    ).toBeInTheDocument();
  });
});
