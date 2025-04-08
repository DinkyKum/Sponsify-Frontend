import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/event/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to fetch event: " + err.message);
      }
    };

    fetchEvent();
  }, [id]);

  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!event) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="bg-gray-950 text-white mt-16 px-6 py-10">
      {/* HEADER */}
      <div className="bg-gray-800 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center shadow-xl">
        {/* Event Info Left */}
        <div className="flex items-center gap-6">
          <img
            src={event.logo}
            alt="Event Logo"
            className="w-28 h-28 object-cover rounded-full border-4 border-emerald-400"
          />
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">{event.name}</h1>
            <p className="text-gray-400 mt-1">{new Date(event.date).toDateString()}</p>
            <p className="text-sm text-gray-400 mt-1">{event.eventType}</p>

            {/* Invest Button */}
            <button
              onClick={() => navigate(`/invest/${event._id}`)}
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md ml-[-10px]"
            >
              Invest Now
            </button>
          </div>
        </div>

        {/* Organizer Info Right */}
        <div className="flex flex-col items-center mt-6 md:mt-0 text-center">
        <img
        src={event.organizer.logo}
        alt="Organizer Logo"
        className="w-16 h-16 object-cover rounded-full border-2 border-white mb-2"
       />
      <p className="text-sm text-gray-400 uppercase tracking-wide">Organizer</p>
      <h2 className="text-lg font-semibold text-white">{event.organizer.name}</h2>
      </div>
      </div>

      {/* SPONSORS SECTION */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Sponsors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.sponsors && event.sponsors.length > 0 ? (
            event.sponsors.map((sponsor) => (
              <div
                key={sponsor._id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{sponsor.name}</h3>
                    <p className="text-sm text-gray-400">{sponsor.address}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{sponsor.about}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No sponsors added yet.</p>
          )}
        </div>
      </div>

      {/* EVENT DETAILS SECTION */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Event Details</h2>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
          <div>
            <h3 className="text-lg font-medium text-white">About</h3>
            <p className="text-gray-300">{event.about}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Budget</h3>
            <p className="text-gray-300">₹{event.budget}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Expected Attendees</h3>
            <p className="text-gray-300">
              {Array.isArray(event.attendees)
                ? event.attendees.join(", ")
                : event.attendees}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Sponsorship Methods</h3>
            <p className="text-gray-300">{event.methods.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
