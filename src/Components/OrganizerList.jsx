import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrganizerList = () => {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await axios.get(BASE_URL + "/viewOrganizers");
        setOrganizers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load organizers. Please try again.");
        setLoading(false);
      }
    };

    fetchOrganizers();
  }, []);

  return (
    <motion.div
      className="bg-gray-900 text-white py-12 px-6 mt-16 min-h-screen"
      initial={{ backgroundColor: "rgb(31, 41, 55)", opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Meet Our Organizers
      </motion.h1>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-2xl shadow-lg p-4 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-600 rounded w-5/6 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-2/3 mx-auto"></div>
              </motion.div>
            ))
          : organizers.map((organizer, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(`/organizer/${organizer._id}`)}
                className="cursor-pointer bg-gray-800 rounded-2xl shadow-lg p-4 transition transform"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.5 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 4px 15px rgba(0, 255, 127, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Organizer Logo */}
                <motion.div className="w-full">
                  <motion.img
                    src={organizer.logo}
                    alt={organizer.name}
                    className="w-full h-48 object-cover rounded-lg border-2 border-emerald-500 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                {/* Organizer Name */}
                <h2 className="text-xl font-semibold text-center mt-4">
                  {organizer.name}
                </h2>

                {/* Organizer About */}
                <p className="text-gray-400 text-sm text-center">{organizer.about}</p>

                {/* Contact Details */}
                <motion.div
                  className="mt-4 flex flex-col items-center space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                >
                  <p className="text-lg flex items-center gap-2 text-emerald-400">
                    <FaEnvelope className="text-xl" /> {organizer.emailId}
                  </p>
                  <p className="text-lg flex items-center gap-2 text-emerald-400">
                    <FaMapMarkerAlt className="text-xl" /> {organizer.address}
                  </p>
                </motion.div>
              </motion.div>
            ))}
      </div>
    </motion.div>
  );
};

export default OrganizerList;
