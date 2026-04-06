import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Home, UserPlus } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 flex items-center space-x-2 text-slate-500 hover:text-purple-600 transition-colors"
      >
        <Home size={20} />
        <span className="font-medium">Home</span>
      </button>

      <div className="w-full max-w-md bg-white dark:bg-[#111822] border border-pink-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full shadow-inner">
            <Sparkles className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Join QuickSTAR</h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Create your capacity-building account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none dark:text-slate-200"
              placeholder="Juan Dela Cruz"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Region / Location</label>
            <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none dark:text-slate-200">
              <option>NCR</option>
              <option>CAR</option>
              <option>Region IV-A</option>
              <option>BARMM</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none dark:text-slate-200"
              placeholder="juan@deped.gov.ph"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none dark:text-slate-200"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-white font-semibold bg-pink-600 hover:bg-pink-700 shadow-md shadow-pink-500/30 transition-all mt-6"
          >
            <span>Create Account</span>
            <UserPlus size={18} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <button onClick={() => navigate('/login')} className="font-medium text-pink-600 dark:text-pink-400 hover:underline">Log in</button>
        </p>
      </div>
    </div>
  );
}
