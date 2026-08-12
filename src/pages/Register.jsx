import { useState } from "react";
import axios from "axios";
import API_URL from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await axios.post(
    `${API_URL}`,
      formData
    );

    console.log(result.data);

    alert(result.data.message);

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration failed"
    );
  }
};


  return (
    <div className="flex min-h-[calc(100vh-76px)]
    items-center justify-center bg-[#111538] px-6">

      <div className="w-full max-w-md rounded-2xl
      border border-orange-900/60 bg-[#20264f]
      p-8 shadow-xl">

        <h1 className="text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Start your study abroad journey
        </p>


        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-lg border border-gray-600
            bg-[#111538] px-4 py-3 text-white
            outline-none focus:border-orange-400"
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-lg border border-gray-600
            bg-[#111538] px-4 py-3 text-white
            outline-none focus:border-orange-400"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="rounded-lg border border-gray-600
            bg-[#111538] px-4 py-3 text-white
            outline-none focus:border-orange-400"
          />


          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r
            from-pink-500 to-orange-400
            py-3 font-bold"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;