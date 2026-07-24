import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // Note: if we add async in inner function in react, it has a problem (break rule in useEffect) and by using async in inner function, it should not return a Promise.
  // Example: useEffect(async () => {}) --> break rule
  useEffect(() => {
    // Exeriise 8l
    const getHomeData = async () => {
      // TODO: Fetch products from the backend
      const urlPath = search ? `/api/products?search=${search}`: `/api/products` 
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <link rel="icon" href="/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
