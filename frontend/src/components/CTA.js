import React from 'react';
import { FiArrowRight, FiZap, FiCheck } from 'react-icons/fi';

const CTA = () => {
  const benefits = [
    'No credit card required',
    'Cancel anytime',
    '24/7 support'
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="ctaPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#ctaPattern)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6" data-aos="fade-up">
          <FiZap className="mr-2 h-4 w-4" />
          Limited Time Offer
        </div>

        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-aos="fade-up" data-aos-delay="100">
          Ready to Land Your{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Next Job?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Join over 10,000 professionals who have successfully transformed their careers with AI-powered resumes. 
          Start your free trial today and see the difference.
        </p>

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 mb-8" data-aos="fade-up" data-aos-delay="300">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center text-blue-100">
              <FiCheck className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
          <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 mx-auto">
            <span className="text-lg">Start Free Trial</span>
            <FiArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
          
          <p className="text-blue-200 text-sm">
            Get started in less than 2 minutes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/20" data-aos="fade-up" data-aos-delay="500">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10,000+</div>
            <div className="text-blue-200">Resumes Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">94%</div>
            <div className="text-blue-200">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">48hrs</div>
            <div className="text-blue-200">Average Response Time</div>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-12" data-aos="fade-up" data-aos-delay="600">
          <p className="text-blue-200 mb-4">
            Already have an account?
          </p>
          <button className="text-white hover:text-yellow-400 font-semibold transition-colors duration-200 underline underline-offset-4">
            Sign in here
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
          <path d="M1200 120L0 16.48V0h1200v120z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};

export default CTA;