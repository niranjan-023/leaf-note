import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

function PublicRoute({ children }) {
  const valid = isTokenValid();

  if (valid) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;