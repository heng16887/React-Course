import { useLocation } from "react-router";

export function Location(){
  const location = useLocation();
  
  return <div data-testid="url-path">{location.pathname}</div>
}