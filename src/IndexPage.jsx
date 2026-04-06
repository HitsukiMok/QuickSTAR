import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function IndexPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in fade-in duration-1000">
      <div className="max-w-3xl space-y-8">
        {/* Logo / Header */}
        <div className="inline-flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4 shadow-inner">
          <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 pb-2">
          QuickSTAR
        </h1>
        
        <h2 className="text-2xl font-medium text-slate-600 dark:text-slate-300">
          Transforming Teacher Data into Actionable Insights
        </h2>

        {/* Overview text requested by user */}
        <p className="text-lg leading-relaxed text-slate-500 dark:text-slate-400 max-w-2xl mx-auto border-l-4 border-pink-400 pl-6 text-left">
          Our solution unifies fragmented teacher data into a centralized hub and interactive map, utilizing AI-driven insights to pinpoint underserved regions across the Philippines. This system empowers the STAR program to move from guesswork to precision by generating actionable strategies for the targeted design and delivery of teacher capacity-building initiatives.
        </p>

        <div className="pt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-purple-600 rounded-full hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30 overflow-hidden"
          >
            <span className="relative z-10 transition-transform group-hover:-translate-x-1">
              Enter Dashboard
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
      
      {/* Decorative background blobs */}
      <div className="fixed top-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
      <div className="fixed top-40 right-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-8 left-1/3 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
  )
}
