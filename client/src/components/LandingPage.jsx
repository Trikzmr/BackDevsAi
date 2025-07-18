import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Key, 
  Activity, 
  Zap, 
  ArrowRight, 
  Github, 
  FileText, 
  Mail,
  ChevronRight,
  Star,
  Users,
  Cpu
} from 'lucide-react';
import ExampleUse from "./ExampleUse"

const LandingPage = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Prompt-Based Backend",
      description: "Generate complete backend functionality with simple natural language prompts"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "API Key Management",
      description: "Secure API key generation and management with granular permissions"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-time Logs",
      description: "Monitor your API usage and performance with live activity tracking"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Plug and Play Integration",
      description: "Seamlessly integrate with your existing projects using standard REST APIs"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechFlow",
      content: "BackDevsAI cut our backend development time by 70%. The prompt-based approach is revolutionary.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Mike Rodriguez",
      role: "CTO",
      company: "StartupCo",
      content: "Finally, a backend solution that thinks like a developer. The API generation is incredibly intuitive.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#1f2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BackDevsAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-[#e5e5e5] hover:text-[#3b82f6] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#3b82f6]/25"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl"></div>
            <h1 className="text-6xl sm:text-7xl font-bold mt-6 mb-6 bg-gradient-to-r from-[#e5e5e5] to-[#9ca3af] bg-clip-text text-transparent">
  Backend Dev — Reimagined<br />
  <span className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] bg-clip-text text-transparent">
    One Intent. One API. Infinite Possibilities.
  </span>
</h1>

            <p className="text-xl sm:text-2xl text-[#9ca3af] mb-12 max-w-3xl mx-auto">
              Skip boilerplate. Build faster. Use prompts to create real backend functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-[#3b82f6]/25 flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="border border-[#1f2937] hover:border-[#3b82f6] text-[#e5e5e5] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:bg-[#3b82f6]/10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
         <h2 className="text-4xl font-bold mb-4">Your Entire Backend Toolkit — In One API.</h2>
            <p className="text-xl text-[#9ca3af] max-w-2xl mx-auto">
              Built for devs who hate wasting time — speed, simplicity, and serious backend firepower.
            </p>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl border border-[#1f2937] hover:border-[#3b82f6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#3b82f6]/10"
              >
                <div className="text-[#3b82f6] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#9ca3af]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ExampleUse/>
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by developers worldwide</h2>
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#3b82f6]" />
                <span className="text-lg">10,000+</span>
                <span className="text-[#9ca3af]">developers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-[#3b82f6]" />
                <span className="text-lg">4.9/5</span>
                <span className="text-[#9ca3af]">rating</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm rounded-xl border border-[#1f2937] hover:border-[#3b82f6]/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-[#9ca3af] text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-[#9ca3af] italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;