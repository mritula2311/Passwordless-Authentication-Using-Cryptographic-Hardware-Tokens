import React from 'react';
import { FiEdit3, FiCpu, FiMail, FiZap, FiTarget, FiTrendingUp } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: FiEdit3,
      title: '✍️ AI Resumes',
      description: 'Our advanced AI analyzes job descriptions and creates perfectly tailored resumes that match what employers are looking for.',
      benefits: [
        'Smart keyword optimization',
        'ATS-friendly formatting',
        'Industry-specific templates'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: FiCpu,
      title: '🧠 Personalization',
      description: 'Get intelligent recommendations based on your experience, skills, and career goals. Stand out with personalized content.',
      benefits: [
        'Experience-based suggestions',
        'Skills gap analysis',
        'Career path guidance'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: FiMail,
      title: '📨 Cover Letter Assistant',
      description: 'Generate compelling cover letters that complement your resume and tell your unique story to potential employers.',
      benefits: [
        'Personalized tone matching',
        'Company research integration',
        'Template library'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const stats = [
    { icon: FiZap, value: '10x', label: 'Faster Creation', color: 'text-yellow-600' },
    { icon: FiTarget, value: '94%', label: 'ATS Pass Rate', color: 'text-blue-600' },
    { icon: FiTrendingUp, value: '3x', label: 'More Interviews', color: 'text-green-600' }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Smart Tools That{' '}
            <span className="gradient-text">Work for You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with career expertise 
            to create resumes that get results.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" data-aos="fade-up" data-aos-delay="200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`card-hover ${feature.bgColor} ${feature.borderColor} border-2 rounded-2xl p-8 relative overflow-hidden`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill={`url(#pattern-${index})`} />
                </svg>
              </div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 relative z-10`}>
                <feature.icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

              {/* Benefits */}
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-gray-700">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} mr-3 flex-shrink-0`}></div>
                    <span className="text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className={`mt-6 w-full py-3 px-6 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105`}>
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16" data-aos="fade-up">
          <p className="text-gray-600 mb-6">
            Ready to create your perfect resume?
          </p>
          <button className="btn-primary">
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;