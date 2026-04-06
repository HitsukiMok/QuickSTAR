import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Home } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('teacher'); // 'admin' or 'teacher'

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

      <div className="w-full max-w-md bg-white dark:bg-[#111822] border border-purple-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full shadow-inner">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-2">Welcome Back</h1>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-8">Login to access the QuickSTAR terminal</p>

        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'teacher' ? 'bg-white dark:bg-slate-700 shadow-sm text-purple-600 dark:text-purple-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            onClick={() => setRole('teacher')}
          >
            Teacher
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'admin' ? 'bg-white dark:bg-slate-700 shadow-sm text-pink-600 dark:text-pink-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            onClick={() => setRole('admin')}
          >
            Administrator
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-slate-200"
              placeholder={role === 'admin' ? 'admin@startdost.gov.ph' : 'teacher@deped.gov.ph'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-slate-200"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">Forgot password?</a>
          </div>
          <button 
            type="submit"
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-white font-semibold shadow-md transition-all ${role === 'admin' ? 'bg-pink-600 hover:bg-pink-700 shadow-pink-500/30' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30'}`}
          >
            <span>Login as {role === 'admin' ? 'Admin' : 'Teacher'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account? <button onClick={() => navigate('/signup')} className="font-medium text-purple-600 dark:text-purple-400 hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
}
