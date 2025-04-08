import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../utils/constants";

const SponsorDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sponsor/${id}`);
        setSponsor(response.data);
      } catch (err) {
        setError("Failed to load sponsor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsor();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center mt-40 text-xl">Loading...</div>
    );
  }

  if (error || !sponsor) {
    return (
      <div className="text-red-500 text-center mt-40 text-xl">{error}</div>
    );
  }

  const budgetData = sponsor.events.map((event) => ({
    label: event.name,
    value: event.budget,
  }));

  const attendeesData = sponsor.events.map((event) => ({
    label: event.name,
    value: event.attendees,
  }));

  return (
    <div className="bg-gray-900 text-white p-8 mt-16 min-h-screen">
      {/* Sponsor Info - Improved */}
      <div className="relative mb-16">
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-700/60 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <img
            src={sponsor.logo}
            alt="Logo"
            className="w-32 h-32 rounded-full border-4 border-emerald-400 shadow-md"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-2">
              {sponsor.name}
            </h1>
            <p className="text-gray-400 text-sm mb-1">{sponsor.emailId}</p>
            <p className="text-gray-400 text-sm mb-4">{sponsor.address}</p>
            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto md:mx-0">
              {sponsor.about}
            </p>
          </div>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Budget per Event</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={budgetData}>
              <XAxis dataKey="label" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Attendees per Event</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendeesData}>
              <XAxis dataKey="label" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#60A5FA" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sponsored Events */}
      <h2 className="text-2xl font-bold mb-6">Sponsored Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsor.events.map((event) => (
          <div
            key={event._id}
            onClick={() => navigate(`/event/${event._id}`)}
            className="cursor-pointer bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition"
          >
            <img
              src={event.logo}
              alt={event.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{event.about}</p>
            <p className="text-sm text-emerald-400 mb-1">
              Event Type: <span className="text-white">{event.eventType}</span>
            </p>
            <p className="text-sm text-emerald-400 mb-1">
              Date:{" "}
              <span className="text-white">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm text-emerald-400 mb-1">
              Attendees:{" "}
              <span className="text-white">{event.attendees}</span>
            </p>
            <p className="text-sm text-emerald-400">
              Sponsorship Methods:{" "}
              <span className="text-white">{event.methods.join(", ")}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorDashboard;
