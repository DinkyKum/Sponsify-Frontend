import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ChatBox from './ChatBox';
import { BASE_URL } from '../utils/constants';

const Deal = () => {
  const { state } = useLocation();
  const deal = state?.deal;
  const [chatMessages, setChatMessages] = useState(deal.chat || []);
  const [newMessage, setNewMessage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(deal.status === 'confirmed');

  const handleConfirmDeal = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/confirmDeal/${deal._id}`,
        { withCredentials: true }
      );
      console.log('Deal confirmed:', response.data);
      setIsConfirmed(true);
      alert('Deal confirmed successfully!');
    } catch (error) {
      console.error('Error confirming deal:', error);
      alert('Failed to confirm deal');
    }
  };

  // Scroll to the top of the page when the component is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!deal) {
    return <div className="text-white text-center mt-20">No deal found.</div>;
  }

  return (
    <div className="p-8 mt-16 bg-gray-900 text-white min-h-screen pb-36">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-green-400">Sponsorship Deal Details</h1>
        <button
          onClick={handleConfirmDeal}
          disabled={isConfirmed}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            isConfirmed
              ? 'bg-gray-600 cursor-not-allowed text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isConfirmed ? 'Deal Confirmed' : 'Confirm Deal'}
        </button>
      </div>

      {/* Event Info */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10">
        <div className="flex items-center space-x-6">
          <img src={deal.event.logo} alt="event logo" className="h-24 w-24 rounded-lg" />
          <div>
            <h2 className="text-2xl font-bold">{deal.event.name}</h2>
            <p className="text-sm text-gray-400 italic">{deal.event.tagline}</p>
            <p className="text-sm text-gray-300 mt-1">
              Organizer: <span className="font-semibold text-white">{deal.event.organizer.name}</span>
            </p>
            <p className="text-sm text-gray-400">Date: {new Date(deal.event.date).toDateString()}</p>
          </div>
        </div>

        <p className="text-gray-300 mt-6">{deal.event.about}</p>
        <p className="text-gray-400 mt-2">Event Type: {deal.event.eventType}</p>
        <p className="text-gray-400">Expected Attendees: {deal.event.attendees}</p>
        <p className="text-gray-400">Budget: ₹{deal.event.budget.toLocaleString()}</p>
        <p className="text-gray-400 mt-2">Methods Accepted: {deal.event.methods.join(', ')}</p>
      </div>

      {/* Sponsor Info */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Sponsor Information</h2>
        <div className="flex items-center space-x-6">
          <img src={deal.sponsor[0].logo} alt="sponsor logo" className="h-20 w-20 rounded-full" />
          <div>
            <p className="text-lg font-bold">{deal.sponsor[0].name}</p>
            <p className="text-sm text-gray-400">{deal.sponsor[0].emailId}</p>
            <p className="text-sm text-gray-400">{deal.sponsor[0].address}</p>
          </div>
        </div>
        <p className="text-gray-300 mt-4">{deal.sponsor[0].about}</p>
      </div>

      {/* Deal Details */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10">
        <h2 className="text-xl font-semibold text-green-400 mb-4">Deal Specifics</h2>
        <p className="text-white">Type: <span className="text-gray-300">{deal.type || 'N/A'}</span></p>
        <p className="text-white mt-2">Methods: <span className="text-gray-300">{deal.methods.join(', ')}</span></p>
        <p className="text-white mt-2">Status: <span className="text-yellow-400 capitalize">{isConfirmed ? 'Confirmed' : deal.status}</span></p>
        {deal.description && (
          <p className="text-sm text-gray-400 mt-3 italic">"{deal.description}"</p>
        )}
      </div>

      {/* Chat Section */}
      <ChatBox dealId={deal._id} chatData={deal.chat} />
    </div>
  );
};

export default Deal;
