import { useState } from "react";
import axios from "axios";
import API_URL from "../services/api";

function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    country: "",
    course: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //   form validation
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = "Name should contain only letters";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must contain exactly 10 digits";
    }

    // Qualification
    if (!formData.qualification.trim()) {
      errors.qualification = "Qualification is required";
    }

    // Country
    if (!formData.country) {
      errors.country = "Please select a country";
    }

    // Course
    if (!formData.course.trim()) {
      errors.course = "Course is required";
    }

    // Budget
    if (!formData.budget) {
      errors.budget = "Please select your budget";
    }

    // Message
    if (formData.message.trim() && formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    // Stop if validation fails
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const result = await axios.post(
        `${API_URL}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(result.data);

      alert(result.data.message);

      // Clear errors
      setErrors({});

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        country: "",
        course: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to submit enquiry");
    }
  };
  return (
    <div className="min-h-screen bg-[#111538] px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div
          className="rounded-2xl
          border border-orange-900/60
          bg-[#20264f]
          p-8 shadow-xl"
        >
          <h1 className="text-center text-3xl font-bold text-white">
            Study Abroad Enquiry
          </h1>

          <p className="mt-2 text-center text-gray-400">
            Tell us about your study abroad plans
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            {/* Name */}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            {/* Phone */}

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numbers
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setFormData({
                      ...formData,
                      phone: value,
                    });
                  }
                }}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Qualification */}

            <div>
              <input
                type="text"
                name="qualification"
                placeholder="Qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              />

              {errors.qualification && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.qualification}
                </p>
              )}
            </div>

            {/* Country */}

            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              >
                <option value="">Select Country</option>
                <option value="Austria">Austria</option>
                <option value="Germany">Germany</option>
                <option value="Canada">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Ireland">Ireland</option>
              </select>

              {errors.country && (
                <p className="mt-1 text-sm text-red-400">{errors.country}</p>
              )}
            </div>

            {/* Course */}

            <div>
              <input
                type="text"
                name="course"
                placeholder="Interested Course"
                value={formData.course}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              />

              {errors.course && (
                <p className="mt-1 text-sm text-red-400">{errors.course}</p>
              )}
            </div>

            {/* Budget */}

            <div>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              >
                <option value="">Select Budget</option>
                <option value="Below 10 Lakhs">Below 10 Lakhs</option>
                <option value="10 - 15 Lakhs">10 - 15 Lakhs</option>
                <option value="15 - 20 Lakhs">15 - 20 Lakhs</option>
                <option value="20 - 30 Lakhs">20 - 30 Lakhs</option>
                <option value="Above 30 Lakhs">Above 30 Lakhs</option>
              </select>

              {errors.budget && (
                <p className="mt-1 text-sm text-red-400">{errors.budget}</p>
              )}
            </div>
            {/* Message */}

            <div className="md:col-span-2">
              <textarea
                name="message"
                placeholder="Tell us more about your plans..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-lg border border-gray-600
    bg-[#111538] px-4 py-3 text-white
    outline-none focus:border-orange-400"
              />

              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>
            {/* Submit */}

            <button
              type="submit"
              className="md:col-span-2
              rounded-lg
              bg-gradient-to-r
              from-pink-500
              to-orange-400
              py-3
              font-bold
              text-white
              transition
              hover:opacity-90"
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
