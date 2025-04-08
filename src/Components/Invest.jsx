import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Invest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/event/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to fetch event details");
      }
    };
    fetchEvent();
  }, [id]);

  const handleCheckboxChange = (method) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || selectedMethods.length === 0) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/invest/${id}`, {
        description,
        methods: selectedMethods}, {withCredentials: true},
      );
      setSuccess("Investment submitted successfully!");
      setError("");
      setDescription("");
      setSelectedMethods([]);
      navigate(`/event/${id}`);
    } catch (err) {
      setError("Failed to submit investment.");
    }
  };

  if (error && !event) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!event) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-950 mt-16 text-white px-6 py-12">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-emerald-400 text-center">
          Invest in {event.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white"
              placeholder="Why do you want to invest in this event?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Sponsorship Methods
            </label>
            <div className="flex flex-wrap gap-4">
              {event.methods.map((method, idx) => (
                <label key={idx} className="flex items-center space-x-2 text-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedMethods.includes(method)}
                    onChange={() => handleCheckboxChange(method)}
                    className="form-checkbox h-5 w-5 text-emerald-500"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Investment
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-emerald-400 hover:underline block text-center"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Invest;
