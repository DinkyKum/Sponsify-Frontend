import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const sponsorshipOptions = [
  "Monetary",
  "Coupons",
  "T-shirts + Goodies",
  "Cash Prizes",
  "Stalls",
  "Food and Beverages",
  "Media Coverage",
  "Social Media Promotion",
  "Internship Opportunities",
];

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    budget: "",
    eventType: "",
    attendees: "",
    about: "",
    methods: [],
    logo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (method) => {
    setFormData((prev) => {
      const methods = prev.methods.includes(method)
        ? prev.methods.filter((m) => m !== method)
        : [...prev.methods, method];
      return { ...prev, methods };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        budget: parseInt(formData.budget),
        attendees: parseInt(formData.attendees),
      };

      await axios.post(`${BASE_URL}/addEvent`, payload, { withCredentials: true });

      // Optional: Redirect after successful event creation
      // navigate(`/organizer/${id}`);

      alert("Event added successfully!");
    } catch (error) {
      console.log("Error object:", error);
      alert("Error adding event: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 pt-24 text-white">
      <h2 className="text-4xl font-bold text-emerald-500 text-center mb-10">
        Create a New Event
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-md p-8 space-y-6"
      >
        {[
          { label: "Event Name", name: "name" },
          { label: "Date", name: "date", type: "date" },
          { label: "Budget (₹)", name: "budget" },
          { label: "Event Type", name: "eventType" },
          { label: "Number of Attendees", name: "attendees" },
          { label: "About", name: "about" },
          { label: "Logo URL", name: "logo" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="relative">
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-6 pb-2 bg-transparent border border-gray-600 rounded-md text-white placeholder-transparent focus:outline-none focus:border-emerald-500"
              placeholder={label}
            />
            <label
              htmlFor={name}
              className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-emerald-500"
            >
              {label}
            </label>
          </div>
        ))}

        {/* Methods of Sponsorship */}
        <div>
          <label className="block text-sm text-emerald-400 mb-2 font-medium">
            Methods of Sponsorship
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sponsorshipOptions.map((method) => (
              <label key={method} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.methods.includes(method)}
                  onChange={() => handleCheckboxChange(method)}
                  className="form-checkbox h-4 w-4 text-emerald-500 border-gray-600 focus:ring-emerald-500"
                />
                <span className="text-gray-300">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 rounded-md font-semibold text-lg transition duration-300 ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
