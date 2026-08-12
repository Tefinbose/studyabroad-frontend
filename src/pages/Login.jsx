import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${API_URL}/api/login`,
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", result.data);

      // Save token
      sessionStorage.setItem(
        "token",
        result.data.token
      );

      // Save user
      sessionStorage.setItem(
        "user",
        JSON.stringify(result.data.user)
      );

      // Check role
      if (result.data.user.role === "admin") {
        // Admin
        navigate("/admin");
      } else {
        // Normal user
        navigate("/dashboard");
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#111538] px-6">

      <div className="w-full max-w-md rounded-2xl border border-orange-900/60 bg-[#20264f] p-8 shadow-xl">

        <h1 className="text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
          />

          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 py-3 font-bold text-white"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;