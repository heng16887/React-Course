import './NotFoundPage.css';
import { Header } from "./Header";

export function NotFoundPage({cart}) {
  return (
    <>
      <Header cart={cart}/>
      <div className="not-found-page-container">
        <span className="number-not-found-page">404</span>
        <p className="not-found-page-text">Not Found Page</p>
      </div>
    </>
  );
}