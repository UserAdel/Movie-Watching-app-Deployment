import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const SignupPage = () => {
  const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue ||'');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("button clicked")
    signup({ email, username, password });
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"}>
          <img src='/netflix-logo.png' alt='logo' className='w-52' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md bg-black/60 py-2 px-5 rounded-lg shadow-md'>
          <h1 className='text-white text-center font-bold text-3xl mb-8'>SignUp</h1>
          <form className='space-y-4' onSubmit={handleSignUp}>
            <div className='space-y-2 py-1'>
              <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>Email</label>
              <input
                type="email"
                className='w-full p-2 rounded-lg bg-black/30 text-white'
                placeholder='you@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='space-y-2 py-1'>
              <label htmlFor="username" className='text-sm font-medium text-gray-300 block'>Username</label>
              <input
                type="text"
                className='w-full p-2 rounded-lg bg-black/60 text-white'
                placeholder='your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='space-y-2 py-1' >
              <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>Password</label>
              <input
                type="password"
                className='w-full p-2 rounded-lg bg-black/60 text-white'
                placeholder='your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className='w-full bg-red-500 py-2 rounded-lg text-white font-semibold' type="submit">SignUp</button>
            <div className='flex justify-center items-center'>
              <h1 className='text-white mr-1'>Already a Member?</h1>
              <Link to='/login' className='text-red-500 hover:underline'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
