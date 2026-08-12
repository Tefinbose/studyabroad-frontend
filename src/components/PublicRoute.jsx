import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

  const token = sessionStorage.getItem("token");
  const storedUser = sessionStorage.getItem("user");

  if (token && storedUser) {

    const user = JSON.parse(storedUser);

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default PublicRoute;