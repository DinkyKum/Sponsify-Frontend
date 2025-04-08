import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice'; // Make sure this is correctly imported

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const HandleLogout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

      dispatch(removeUser()); // No need to pass res.data if removeUser doesn't need it
      navigate('/'); // Redirect to home after logout
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <nav className="bg-gray-900 text-white h-16 px-6 shadow-lg fixed w-full top-0 left-0 z-50 flex items-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <Link to="/" className="text-2xl font-bold text-emerald-500">Sponsify</Link>
        
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-emerald-400 transition">Home</Link></li>
          <li><Link to="/sponsors" className="hover:text-emerald-400 transition">Top Sponsors</Link></li>
          <li><Link to="/events" className="hover:text-emerald-400 transition">Find Events</Link></li>
          <li><Link to="/organizers" className="hover:text-emerald-400 transition">Meet Organizers</Link></li>
          <li><Link to="/deals" className="hover:text-emerald-400 transition">My Deals</Link></li>
        </ul>

        {!user ? (
          <Link to="/login" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-md transition">
            Sign Up
          </Link>
        ) : (
          <button onClick={HandleLogout} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-md transition">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
