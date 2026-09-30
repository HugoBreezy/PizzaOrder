import { Navigate } from "react-router-dom";

function ProtectedDeliveryRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "DELIVERY") {
    return <Navigate to="/" replace />;
  }

  if (user.status === "INACTIVE") {
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedDeliveryRoute;