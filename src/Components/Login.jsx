import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from "react-router";
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("Dinky@gmail.com");
  const [password, setPassword] = useState("Dinky@123");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg");
  const [address, setAddress] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("sponsor");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Something went wrong");
    }
  };

  const HandleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup/" + userRole, { name, emailId, password, logo, address }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center bg-gray-900 text-white p-6 mt-16">
      
      {/* Show Role Selection Buttons Only for Sign Up */}
      {!isLogin && (
        <div className="flex justify-center items-center space-x-4 mb-6 w-full">
          <button
            className={`px-6 py-2 text-lg font-semibold rounded-md transition-colors duration-300 
                        ${userRole === 'sponsor' ? 'bg-emerald-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setUserRole('sponsor')}
          >
            As Sponsor
          </button>
          <button
            className={`px-6 py-2 text-lg font-semibold rounded-md transition-colors duration-300 
                        ${userRole === 'organizer' ? 'bg-emerald-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setUserRole('organizer')}
          >
            As Organizer
          </button>
        </div>
      )}

      {/* Authentication Form */}
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>

        <div>
          {/* Show Additional Fields Only on Sign Up */}
          {!isLogin && (
            <>
              <label className="block mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:ring-2 focus:ring-emerald-500" placeholder="Your Name" required />

              <label className="block mb-2">Logo</label>
              <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:ring-2 focus:ring-emerald-500" placeholder="Logo URL" required />

              <label className="block mb-2">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:ring-2 focus:ring-emerald-500" placeholder="Your Address" required />
            </>
          )}

          <label className="block mb-2">E-mail ID</label>
          <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:ring-2 focus:ring-emerald-500" placeholder="Your Email" required />

          <label className="block mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:ring-2 focus:ring-emerald-500" placeholder="Your Password" required />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button onClick={isLogin ? HandleLogin : HandleSignUp}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}
          className="text-center text-sm mt-4 cursor-pointer text-gray-400 hover:text-white">
          {isLogin ? "New User? Sign Up here" : "Existing User? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
