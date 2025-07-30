import React from 'react';
import { FiPlay, FiArrowRight, FiZap, FiTrendingUp, FiAward } from 'react-icons/fi';

// Simple animated SVG instead of Lottie for now (can be replaced with actual Lottie animation)
const AnimatedSVG = () => (
  <div className="relative">
    <svg 
      className="w-full h-auto max-w-lg animate-pulse-slow" 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="200" cy="150" r="120" fill="url(#gradient1)" fillOpacity="0.1" className="animate-bounce-slow" />
      
      {/* Document Icon */}
      <rect x="150" y="80" width="100" height="140" rx="8" fill="url(#gradient2)" className="drop-shadow-lg" />
      <rect x="160" y="100" width="80" height="4" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="160" y="110" width="60" height="4" rx="2" fill="white" fillOpacity="0.6" />
      <rect x="160" y="120" width="70" height="4" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="160" y="140" width="80" height="4" rx="2" fill="white" fillOpacity="0.8" />
      <rect x="160" y="150" width="50" height="4" rx="2" fill="white" fillOpacity="0.6" />
      <rect x="160" y="160" width="75" height="4" rx="2" fill="white" fillOpacity="0.8" />
      
      {/* AI Brain Icon */}
      <circle cx="120" cy="120" r="25" fill="url(#gradient3)" className="animate-pulse" />
      <path d="M110 115 L115 120 L125 110" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Success Stars */}
      <g className="animate-bounce">
        <path d="M280 100 L285 110 L295 110 L287 118 L290 128 L280 123 L270 128 L273 118 L265 110 L275 110 Z" fill="#FFD700" />
        <path d="M320 140 L323 146 L329 146 L324 151 L326 157 L320 154 L314 157 L316 151 L311 146 L317 146 Z" fill="#FFD700" />
      </g>
      
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#8B5CF6', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#1D4ED8', stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#8B5CF6', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#6366F1', stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
    
    {/* Floating Elements */}
    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full animate-bounce">
      <FiZap className="h-4 w-4 text-white" />
    </div>
    <div className="absolute bottom-8 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full animate-pulse">
      <FiTrendingUp className="h-4 w-4 text-white" />
    </div>
    <div className="absolute top-1/2 right-8 bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}>
      <FiAward className="h-4 w-4 text-white" />
    </div>
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div data-aos="fade-right" className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <FiZap className="mr-2 h-4 w-4" />
              AI-Powered Resume Builder
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Craft Perfect Resumes with{' '}
              <span className="gradient-text">AI in Seconds</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your career with our AI-powered resume builder. Get personalized suggestions, 
              professional formatting, and industry-specific templates that land interviews.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="btn-primary group flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="btn-secondary group flex items-center justify-center space-x-2">
                <FiPlay className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">J</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">S</div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">M</div>
                </div>
                <span>1000+ happy users</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div data-aos="fade-left" className="flex justify-center lg:justify-end">
            <AnimatedSVG />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;