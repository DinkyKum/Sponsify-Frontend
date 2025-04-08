import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const OrganizerDashboard = () => {
  const { id } = useParams();
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizer = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/organizer/${id}`);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizer();
  }, [id]);

  const formatEventsForChart = () => {
    return organizer.events.map((event) => ({
      name: event.name,
      date: event.date,
      budget: event.budget,
      attendees: event.attendees[0] || 0,
    }));
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!organizer) return <div className="text-white text-center mt-20">Organizer not found</div>;

  return (
    <div className="bg-gray-950 text-white mt-16 p-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 flex-wrap gap-4">
        <div className="flex gap-6 items-center">
          <img
            src={organizer.logo}
            alt="logo"
            className="w-32 h-32 object-cover rounded-full border-4 border-emerald-500 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold text-emerald-400">{organizer.name}</h1>
            <p className="text-gray-300 mt-2 max-w-xl">{organizer.about}</p>
            <p className="text-sm text-gray-500 mt-1">{organizer.emailId} | {organizer.address}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/addEvent`)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          + Add New Event
        </button>
      </div>

      {/* Chart */}
      <div className="mb-12 bg-gray-900 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Event Timeline</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formatEventsForChart()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              stroke="#ccc"
              tickFormatter={(tick) => {
                const date = new Date(tick);
                return `${String(date.getDate()).padStart(2, "0")}-${String(
                  date.getMonth() + 1
                ).padStart(2, "0")}-${String(date.getFullYear()).slice(2)}`;
              }}
            />
            <YAxis stroke="#ccc" />
            <Tooltip
              content={({ payload }) =>
                payload && payload.length ? (
                  <div className="bg-gray-800 p-2 rounded text-white text-sm">
                    <p><strong>{payload[0].payload.name}</strong></p>
                    <p>Budget: ₹{payload[0].payload.budget}</p>
                    <p>Attendees: {payload[0].payload.attendees}</p>
                  </div>
                ) : null
              }
            />
            <Line type="monotone" dataKey="budget" stroke="#34d399" strokeWidth={2} />
            <Line type="monotone" dataKey="attendees" stroke="#60a5fa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Event Cards */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Events Organized</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizer.events.map((event) => (
            <div key={event._id} className="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-emerald-500/40">
              <img src={event.logo} alt={event.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-1">{event.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{event.about}</p>
              <p className="text-sm text-emerald-300">
                Date: <span className="text-white">{new Date(event.date).toLocaleDateString("en-GB")}</span>
              </p>
              <p className="text-sm text-emerald-300">Budget: <span className="text-white">₹{event.budget}</span></p>
              <p className="text-sm text-emerald-300">Attendees: <span className="text-white">{event.attendees[0] || 0} </span></p>
              <p className="text-sm text-emerald-300">Type: <span className="text-white">{event.eventType}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
