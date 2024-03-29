import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { signInSuccess } from '../redux/features/userSlice';
import Pix from '../assets/bg.jpg';
import '../styles/auth.scss';

const Signin = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        toast.error(data.message);
        return;
      }
      dispatch(signInSuccess(data));
      setError(null);
      setIsLoading(false);
      nav('/profile');
      toast.success(`Welcome ${formData.email}`);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="overlay"></div>

      <div className="content">
        <div className="left">
          <img src={Pix} alt="" />
        </div>
        <div className="right">
          <h1>Welcome Back! </h1>
          <p>Kindly login with your registered email!</p>
          <p>
            To lodge complaints or make enquiries, please email:{' '}
            <a href="mailto:tacnabujametroyouths@gmail.com">
              tacnabujametroyouths@gmail.com
            </a>
          </p>
          <p>
            Online registration has ended. You are adviced to visit the
            accreditation stand for manual registration.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              className="input"
              id="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="input"
              id="password"
              onChange={handleChange}
              required
            />
            <button disabled={isLoading} type="submit" className="submit">
              {isLoading ? 'Signing you in...' : 'Sign In'}
            </button>
          </form>
          <div className="account">
            <p className="account-text">
              dont have an account?{' '}
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
            </p>

            {/* <Oauth /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
