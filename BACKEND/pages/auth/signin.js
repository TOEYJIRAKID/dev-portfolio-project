// pages/auth/signin.js
'use client'

import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function signin() {

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // Attempt to sign in using the credentials provider
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (!result.error) {
        // Successful sign-in
        router.push('/')
      } else {
        // Handle sign-in error
        setError('Invalid email or password');
        setTimeout(() => {
          setError('')
        }, 4000); // remove error after 4 sec
      }

    } catch (error) {
      setError('Sign-in failed. please try again');
      setTimeout(() => {
        setError('')
      }, 4000); // remove error after 4 sec
    } finally {
      setLoading(false); // ensure loading in set to false in all cases
      setTimeout(() => {
        setError('')
      }, 4000); // remove error after 4 sec
    }
  }

  return (
    <>
      <div className="flex flex-center full-h">
        <div className="loginform">
          <div className="heading">Sign Up Create Admin</div>
          <form className="form" onSubmit={handleSubmit}>
            <input type="email" name="email" onChange={handleChange} className="input" placeholder="Email" />
            <input type="password" name="password" onChange={handleChange} className="input" placeholder="Password" />
            <button className="login-button" type="submit">Sign Up</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
