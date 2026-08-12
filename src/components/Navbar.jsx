import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check login status whenever the page/route changes
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Invalid user data");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="flex items-center justify-between bg-[#20264f] px-6 py-4">

      {/* LOGO */}

      <Link
        to={
          user
            ? user.role === "admin"
              ? "/admin"
              : "/dashboard"
            : "/"
        }
        className="text-2xl font-bold text-white"
      >
        Study Abroad
      </Link>


      {/* NAVIGATION */}

      <div className="flex items-center gap-4">

        {!user ? (
          <>
            {/* LOGIN */}

            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-white transition hover:bg-white/10"
            >
              Login
            </Link>


            {/* REGISTER */}

            <Link
              to="/register"
              className="rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 font-semibold text-white transition hover:opacity-90"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* DASHBOARD */}

            <Link
              to={
                user.role === "admin"
                  ? "/admin"
                  : "/dashboard"
              }
              className="rounded-lg px-4 py-2 text-white transition hover:bg-white/10"
            >
              Dashboard
            </Link>


            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500/20 px-4 py-2 font-semibold text-red-400 transition hover:bg-red-500/30"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;