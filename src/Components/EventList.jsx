import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(BASE_URL + "/viewEvents");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load events. Please try again.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <motion.div
      className="bg-gray-900 text-white py-12 px-6 mt-16 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-emerald-400"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Fund the Future of Events
      </motion.h1>

      {error && (
        <p className="text-center text-red-500 font-medium mb-6">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-6 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
              </div>
            ))
          : events.map((event, index) => (
              <Link to={`/event/${event._id}`} key={event._id}>
                <motion.div
                  className="bg-gray-800 rounded-2xl p-5 shadow-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={event.logo}
                    alt={event.name}
                    className="w-full h-48 object-cover rounded-xl mb-4 border border-emerald-500 shadow-md"
                  />
                  <h2 className="text-xl font-semibold text-emerald-400 mb-1 text-center">
                    {event.name}
                  </h2>
                  <p className="text-gray-300 text-sm mb-3 text-center">
                    {event.about}
                  </p>

                  <div className="mt-4 bg-gray-700 rounded-xl px-4 py-3">
                    <p className="text-sm text-gray-400 mb-1 font-medium">
                      Sponsorship Methods:
                    </p>
                    <p className="text-white text-sm">
                      {event.methods.join(", ")}
                    </p>
                  </div>

                  <div className="mt-3 bg-gray-700 rounded-xl px-4 py-3">
                    <p className="text-sm text-gray-400 mb-1 font-medium">
                      Expected Attendees:
                    </p>
                    <p className="text-white text-sm">{event.attendees}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
      </div>
    </motion.div>
  );
};

export default EventList;
