import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sun, Moon, ArrowRight, Sparkles, Database, BrainCircuit, Target, BookOpen, User, ShieldCheck, Menu } from 'lucide-react'

export default function IndexPage({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pb-24 overflow-hidden relative">
      
      {/* Decorative background blobs - muted */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-[#e0e2f5] dark:bg-[#1a1c2e] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[120px] opacity-60 animate-pulse transition-opacity duration-1000 -z-10"></div>
      <div className="fixed -bottom-8 left-1/3 w-[500px] h-[500px] bg-[#ebebf5] dark:bg-[#141524] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[120px] opacity-60 animate-pulse transition-opacity duration-1000 delay-1000 -z-10"></div>

      {/* Top Navigation */}
      <nav className={`w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between transition-all duration-1000 transform z-50 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#4e4d82] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-[#e0b234]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#4e4d82] dark:text-slate-200">
            Quick<span className="text-[#e0b234]">STAR</span>
          </span>
        </div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#4e4d73] dark:text-slate-300">
          <Link to="/" className="hover:text-[#6e6bba] dark:hover:text-purple-400 transition-colors">HOME</Link>
          <a href="#about-us" className="hover:text-[#6e6bba] dark:hover:text-purple-400 transition-colors">ABOUT US</a>
          <Link to="/login" className="flex items-center space-x-1 hover:text-[#6e6bba] dark:hover:text-purple-400 transition-colors group">
            <span>TERMINAL</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-[#4e4d73] dark:text-slate-300 hover:bg-[#ebebf5] dark:hover:bg-slate-800 transition-colors group">
            <div className="group-hover:animate-wiggle">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </button>
          <button className="md:hidden p-2 text-[#4e4d73] dark:text-slate-300">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-4xl space-y-8 text-center relative z-10 w-full mt-16 mb-32 px-6">
        <h1 className={`text-6xl md:text-8xl font-black text-[#3a3959] dark:text-slate-100 pb-2 transition-all duration-1000 delay-150 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Quick<span className="text-[#e0b234]">STAR</span> Platform
        </h1>
        
        <p className={`text-xl md:text-2xl leading-relaxed text-[#68678c] dark:text-slate-400 max-w-3xl mx-auto transition-all duration-1000 delay-500 transform font-light ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Our solution unifies fragmented teacher data into a centralized hub and interactive map, utilizing AI-driven insights to pinpoint underserved regions across the Philippines. This system empowers the STAR program to move from guesswork to precision.
        </p>

        {/* Authentication Options */}
        <div className={`pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-700 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button
            onClick={() => navigate('/login')}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-lg font-semibold text-white transition-all duration-300 bg-[#4e4d82] rounded-full hover:bg-[#3a3959] hover:-translate-y-1 hover:shadow-xl shadow-lg border border-transparent"
          >
            <User className="w-5 h-5" />
            <span>Teacher Login</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => navigate('/login')}
            className="group flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-lg font-semibold text-[#4e4d82] dark:text-slate-200 transition-all duration-300 bg-white dark:bg-[#1a1c2e] border-2 border-[#e6e6f2] dark:border-slate-800 rounded-full hover:border-[#4e4d82] hover:-translate-y-1 hover:shadow-lg shadow-sm"
          >
            <ShieldCheck className="w-5 h-5 text-[#8685ba]" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* What's QuickSTAR Section */}
      <div id="about-us" className={`w-full max-w-6xl mt-12 px-6 transition-all duration-1000 delay-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3a3959] dark:text-white mb-4">
            What's Quick<span className="text-[#e0b234]">STAR</span>
          </h2>
          <div className="h-1 w-24 bg-[#4e4d82] mx-auto rounded-full opacity-50"></div>
        </div>

        {/* Step Numbers Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { step: '01', title: 'Ingest', desc: 'Unify fragmented teacher data locally.', icon: <Database className="w-8 h-8 text-[#6564a3] mb-4" /> },
            { step: '02', title: 'Analyze', desc: 'AI-driven insight generation algorithms.', icon: <BrainCircuit className="w-8 h-8 text-[#6564a3] mb-4" /> },
            { step: '03', title: 'Target', desc: 'Pinpoint specific underserved regions.', icon: <Target className="w-8 h-8 text-[#6564a3] mb-4" /> },
            { step: '04', title: 'Deploy', desc: 'Deliver capacity-building initiatives.', icon: <BookOpen className="w-8 h-8 text-[#6564a3] mb-4" /> }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#151726] border border-[#f0f0f5] dark:border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-5xl font-black text-[#e8e8f2] dark:text-slate-800 mb-2">{item.step}</h3>
              <h4 className="text-xl font-bold text-[#4e4d73] dark:text-slate-200 mb-4">{item.title}</h4>
              <p className="text-sm text-[#8685ab] dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Feature Cards Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: 'Interactive Dashboard', text: 'Filter profiles dynamically without expensive query operations using React native states.', icon: <Database className="text-[#4e4d82]" /> },
            { title: 'AI Driven Analytics', text: 'Identifies systemic patterns, matching subject abundance with critical region deficiencies.', icon: <BrainCircuit className="text-[#4e4d82]" /> },
            { title: 'Granular Insights', text: 'Inspect subject specializations down strictly to sub-categories like Earth Science or Geometry.', icon: <Target className="text-[#4e4d82]" /> },
            { title: 'Streamlined Delivery', text: 'Generate reliable reports supporting targeted resource allocation and training.', icon: <BookOpen className="text-[#4e4d82]" /> }
          ].map((feature, i) => (
            <div key={i} className="bg-[#fcfcff] dark:bg-[#151726] border border-[#f0f0f5] dark:border-slate-800 p-8 rounded-3xl flex items-start gap-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-[#e6e6f2] dark:border-slate-800 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#3a3959] dark:text-slate-100 mb-2">{feature.title}</h4>
                <p className="text-[#68678c] dark:text-slate-400 text-sm leading-relaxed">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
