// pages/auth/signup.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp() {

  const { data: session, status } = useSession();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [allowSignUp, setAllowSignUp] = useState(true); // Default to true if not set in .env
  const [showPassword, setShowPassword] = useState(false); // For Password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For Confirm Password
  const router = useRouter();

  // authenticate
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router])

  useEffect(() => {
    const fetchSignUpStatus = async () => {
      try {
        const res = await fetch('/api/auth/signup-status'); // Create this API route
        const data = await res.json();
        setAllowSignUp(data.allowSignUp);
      } catch (err) {
        console.error("Error fetching signup status:", err);
      }
    };

    fetchSignUpStatus();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError('')
      }, 4000); // remove error after 4 sec
      return;
    }

    const res = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.error) {
      setError('Error happened here')
      setTimeout(() => {
        setError('')
      }, 3000); // remove error after 3 sec
    } else {
      router.push('/auth/signin');
    }
  }

  // Function to toggle password visibility for Password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle password visibility for Confirm Password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Display different UI based on allowSignUp
  if (!allowSignUp) {
    return (
      <div className="flex flex-center full-h">
        <div className="loginform">
          <p className="text-center">You Don't Have permision to Signup To this Admin Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign Up</div>
          <form className="form" onSubmit={handleSubmit}>
            <input required type="email" name="email" onChange={handleChange} className="input" placeholder="Email" />
            {/* <input required type="password" name="password" onChange={handleChange} className="input" placeholder="Password" /> */}
            {/* <input required type="password" name="confirmPassword" onChange={handleChange} className="input" placeholder="Confirm Password" /> */}
            <div className="password-input-container">
              <input required className="input password-input" type={showPassword ? 'text' : 'password'} name="password" id="password" value={form.password} onChange={handleChange} placeholder="Password" />
              <button type="button" className="password-toggle-button" onClick={togglePasswordVisibility}>
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <div className="password-input-container">
              <input required className="input password-input" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
              <button type="button" className="password-toggle-button" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <button className="login-button" type="submit">Sign Up</button>
            {error && <p className="login-error">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}