import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

function ProtectedRoute({ children }) {
  const valid = isTokenValid();

  if (!valid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;