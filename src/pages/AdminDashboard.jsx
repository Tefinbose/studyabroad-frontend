import { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import API_URL from "../services/api";

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingEnquiry, setEditingEnquiry] = useState(null);

  // =====================================
  // GET ALL ENQUIRIES
  // =====================================

  const getAllEnquiries = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const result = await axios.get(
        "http://localhost:5000/api/enquiries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Enquiries:", result.data);

      setEnquiries(result.data.enquiries || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch enquiries"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // DELETE ENQUIRY
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/enquiries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted enquiry from frontend
      setEnquiries((previousEnquiries) =>
        previousEnquiries.filter(
          (enquiry) => enquiry._id !== id
        )
      );

      alert("Enquiry deleted successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete enquiry"
      );
    }
  };

  // =====================================
  // OPEN EDIT MODAL
  // =====================================

  const handleEdit = (enquiry) => {
    setEditingEnquiry({
      ...enquiry,
    });

    setShowEditModal(true);
  };

  // =====================================
  // UPDATE ENQUIRY
  // =====================================

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const result = await axios.put(
        `${API_URL}/api/enquiries/${editingEnquiry._id}`,
        {
          name: editingEnquiry.name,
          email: editingEnquiry.email,
          phone: editingEnquiry.phone,
          qualification: editingEnquiry.qualification,
          country: editingEnquiry.country,
          course: editingEnquiry.course,
          budget: editingEnquiry.budget,
          message: editingEnquiry.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated:", result.data);

      // Update frontend state
      setEnquiries((previousEnquiries) =>
        previousEnquiries.map((enquiry) =>
          enquiry._id === editingEnquiry._id
            ? result.data.enquiry
            : enquiry
        )
      );

      setShowEditModal(false);
      setEditingEnquiry(null);

      alert("Enquiry updated successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update enquiry"
      );
    }
  };

  // =====================================
  // GET DATA WHEN PAGE LOADS
  // =====================================

  useEffect(() => {
    getAllEnquiries();
  }, []);

  return (
    <div className="min-h-screen bg-[#111538] px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-400">
            Manage student study abroad enquiries
          </p>
        </div>

        {/* ================= STATISTICS ================= */}

        <div className="mb-8 grid gap-5 md:grid-cols-3">

          {/* Total Enquiries */}

          <div className="rounded-xl bg-[#20264f] p-6 shadow-lg">
            <p className="text-sm text-gray-400">
              Total Enquiries
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {enquiries.length}
            </h2>
          </div>

          {/* Countries */}

          <div className="rounded-xl bg-[#20264f] p-6 shadow-lg">
            <p className="text-sm text-gray-400">
              Countries
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {
                new Set(
                  enquiries.map(
                    (enquiry) => enquiry.country
                  )
                ).size
              }
            </h2>
          </div>

          {/* Latest Enquiry */}

          <div className="rounded-xl bg-[#20264f] p-6 shadow-lg">
            <p className="text-sm text-gray-400">
              Latest Enquiry
            </p>

            <h2 className="mt-2 text-lg font-bold text-white">
              {enquiries.length > 0
                ? enquiries[0].name
                : "No enquiries"}
            </h2>
          </div>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="rounded-xl bg-[#20264f] p-10 text-center">
            <p className="text-gray-300">
              Loading enquiries...
            </p>
          </div>
        )}

        {/* ================= NO DATA ================= */}

        {!loading && enquiries.length === 0 && (
          <div className="rounded-xl bg-[#20264f] p-10 text-center">

            <h2 className="text-xl font-semibold text-white">
              No enquiries found
            </h2>

            <p className="mt-2 text-gray-400">
              Student enquiries will appear here.
            </p>

          </div>
        )}

        {/* ================= TABLE ================= */}

        {!loading && enquiries.length > 0 && (
          <div className="overflow-hidden rounded-xl bg-[#20264f] shadow-xl">

            <div className="border-b border-gray-700 p-6">

              <h2 className="text-xl font-semibold text-white">
                Student Enquiries
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                All submitted enquiries
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1300px] text-left">

                {/* TABLE HEADER */}

                <thead className="bg-[#181d43]">

                  <tr>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Student
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Qualification
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Country
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Course
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Budget
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Message
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-300">
                      Actions
                    </th>

                  </tr>

                </thead>

                {/* TABLE BODY */}

                <tbody>

                  {enquiries.map((enquiry) => (

                    <tr
                      key={enquiry._id}
                      className="border-b border-gray-700 transition hover:bg-[#252b58]"
                    >

                      {/* STUDENT */}

                      <td className="px-6 py-5">

                        <p className="font-semibold text-white">
                          {enquiry.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          {enquiry.email}
                        </p>

                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-5 text-gray-300">
                        {enquiry.phone}
                      </td>

                      {/* QUALIFICATION */}

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                          {enquiry.qualification}
                        </span>

                      </td>

                      {/* COUNTRY */}

                      <td className="px-6 py-5 text-gray-300">
                        {enquiry.country}
                      </td>

                      {/* COURSE */}

                      <td className="px-6 py-5 text-gray-300">
                        {enquiry.course}
                      </td>

                      {/* BUDGET */}

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-300">
                          {enquiry.budget || "-"}
                        </span>

                      </td>

                      {/* MESSAGE */}

                      <td className="px-6 py-5">

                        <p className="max-w-[250px] text-sm text-gray-400">
                          {enquiry.message || "-"}
                        </p>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEdit(enquiry)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400 transition hover:bg-yellow-500/30"
                            title="Edit enquiry"
                          >

                            <FontAwesomeIcon
                              icon={faPenToSquare}
                            />

                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                enquiry._id
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/20 text-red-400 transition hover:bg-red-500/30"
                            title="Delete enquiry"
                          >

                            <FontAwesomeIcon
                              icon={faTrash}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* ================= EDIT MODAL ================= */}

        {showEditModal && editingEnquiry && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#20264f] p-8 shadow-2xl">

              {/* MODAL HEADER */}

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-white">
                  Edit Enquiry
                </h2>

                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingEnquiry(null);
                  }}
                  className="text-2xl text-gray-400 hover:text-white"
                >
                  ×
                </button>

              </div>

              {/* FORM */}

              <div className="grid gap-4 md:grid-cols-2">

                {/* NAME */}

                <input
                  type="text"
                  value={editingEnquiry.name || ""}
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      name: e.target.value,
                    })
                  }
                  placeholder="Full Name"
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                />

                {/* EMAIL */}

                <input
                  type="email"
                  value={editingEnquiry.email || ""}
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email Address"
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                />

                {/* PHONE */}

                <input
                  type="text"
                  value={editingEnquiry.phone || ""}
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone Number"
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                />

                {/* QUALIFICATION */}

                <input
                  type="text"
                  value={
                    editingEnquiry.qualification || ""
                  }
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      qualification:
                        e.target.value,
                    })
                  }
                  placeholder="Qualification"
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                />

                {/* COUNTRY */}

                <select
                  value={editingEnquiry.country || ""}
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      country: e.target.value,
                    })
                  }
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                >

                  <option value="">
                    Select Country
                  </option>

                  <option value="Austria">
                    Austria
                  </option>

                  <option value="Germany">
                    Germany
                  </option>

                  <option value="Canada">
                    Canada
                  </option>

                  <option value="UK">
                    United Kingdom
                  </option>

                  <option value="Australia">
                    Australia
                  </option>

                  <option value="Ireland">
                    Ireland
                  </option>

                </select>

                {/* COURSE */}

                <input
                  type="text"
                  value={editingEnquiry.course || ""}
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      course: e.target.value,
                    })
                  }
                  placeholder="Interested Course"
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                />

                {/* BUDGET */}

                <select
                  value={editingEnquiry.budget || ""}
                  onChange={(e) =>
                    setEditingEnquiry({
                      ...editingEnquiry,
                      budget: e.target.value,
                    })
                  }
                  className="rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
                >

                  <option value="">
                    Select Budget
                  </option>

                  <option value="Below 10 Lakhs">
                    Below 10 Lakhs
                  </option>

                  <option value="10 - 15 Lakhs">
                    10 - 15 Lakhs
                  </option>

                  <option value="15 - 20 Lakhs">
                    15 - 20 Lakhs
                  </option>

                  <option value="20 - 30 Lakhs">
                    20 - 30 Lakhs
                  </option>

                  <option value="Above 30 Lakhs">
                    Above 30 Lakhs
                  </option>

                </select>

              </div>

              {/* MESSAGE */}

              <textarea
                value={editingEnquiry.message || ""}
                onChange={(e) =>
                  setEditingEnquiry({
                    ...editingEnquiry,
                    message: e.target.value,
                  })
                }
                rows="5"
                placeholder="Message"
                className="mt-4 w-full rounded-lg border border-gray-600 bg-[#111538] px-4 py-3 text-white outline-none focus:border-orange-400"
              />

              {/* MODAL BUTTONS */}

              <div className="mt-6 flex justify-end gap-3">

                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingEnquiry(null);
                  }}
                  className="rounded-lg bg-gray-700 px-5 py-3 text-white transition hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default AdminDashboard;