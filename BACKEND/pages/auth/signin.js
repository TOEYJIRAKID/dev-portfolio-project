// pages/auth/signin.js
'use client'

import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function signin() {

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
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
            <input required className="input" type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="Password" />
            <input className="login-button" type="submit" value="Login" />
            {error && <p className="login-error">{error}</p>}
          </form>
          <span className="agreement"><a href="https://google.com/" target="_blank">Learn Admin license agreement</a></span>
        </>}
      </div>
    </div>
  );
}
