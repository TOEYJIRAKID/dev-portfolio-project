// pages/auth/signin.js
'use client'

import Link from "next/link";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function signin() {

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router])

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

    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Sign-in failed. please try again.');
      setTimeout(() => {
        setError('')
      }, 4000); // remove error after 4 sec
    } finally {
      setLoading(false); // ensure loading in set to false in all cases
      setTimeout(() => {
        setError('')
      }, 4000); // remove error after 4 sec
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (status === 'loading') {
    return <div className="flex flex-center wh_100"><Spinner /></div>;
  }

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign In</div>
        {loading ? <div className="flex flex-center w-100 flex-col"><Spinner /> Checking...</div> : <>
          <form className="form" onSubmit={handleSubmit}>
            <input required className="input" type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <div className="password-input-container">
              <input required className="input password-input" type={showPassword ? 'text' : 'password'} name="password" id="password" value={form.password} onChange={handleChange} placeholder="Password" />
              <button type="button" className="password-toggle-button" onClick={togglePasswordVisibility}>
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <input className="login-button" type="submit" value="Login" />
            {error && <p className="login-error">{error}</p>}
          </form>
          {/* <span className="agreement">
            <Link href="/agreement" target="_blank">
              Learn Admin license agreement
            </Link>
          </span> */}
        </>}
      </div>
    </div>
  );
}
