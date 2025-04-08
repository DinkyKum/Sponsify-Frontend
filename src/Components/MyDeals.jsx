import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const MyDeals = () => {
  const user = useSelector(state => state.user);
  const userType = user?.role;
  const [groupedDeals, setGroupedDeals] = useState({});
  const [rawDeals, setRawDeals] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userType) return;

    const fetchDeals = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/myDeals/${userType}`, {
          withCredentials: true,
        });

        console.log('Raw API Response:', response.data);
        setRawDeals(response.data);

        const deals = Array.isArray(response.data)
          ? response.data
          : response.data.deals || [];

        const grouped = {};
        deals.forEach((deal) => {
          const eventId = deal.event._id;
          if (!grouped[eventId]) {
            grouped[eventId] = {
              event: deal.event,
              deals: [],
            };
          }
          grouped[eventId].deals.push(deal);
        });

        setGroupedDeals(grouped);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    fetchDeals();
  }, [userType]);

  return (
    <div className="p-8 mt-16 bg-gray-900 text-white pb-36">
      <h1 className="text-4xl font-extrabold mb-10 text-center">My Sponsorship Deals</h1>

      {Object.values(groupedDeals).map(({ event, deals }) => (
        <div
          key={event._id}
          className="mb-12 bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-green-400">{event.name}</h2>
              <p className="text-sm text-gray-400 italic">{event.tagline}</p>
              <p className="text-sm text-gray-300 mt-1">
                Organized by: <span className="font-semibold text-white">{event.organizer.name}</span>
              </p>
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
              onClick={() => navigate(`/event/${event._id}`)}
            >
              View Event
            </button>
          </div>

          {/* Full-width sponsorship deal boxes */}
          <div className="flex flex-col space-y-4">
            {deals.map((deal) => (
              <div
                key={deal._id}
                className="w-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 border border-gray-600 rounded-lg p-5 shadow-md"
              >
                <h3 className="text-xl font-semibold text-green-300">Sponsorship: {deal.type}</h3>
                <p className="text-sm text-gray-200 mt-2">Methods: {deal.methods.join(', ')}</p>
                {deal.description && (
                  <p className="text-sm text-gray-400 mt-3 italic">"{deal.description}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedDeals).length === 0 && (
        <p className="text-center text-gray-400 mt-10">No deals found.</p>
      )}
    </div>
  );
};

export default MyDeals;
