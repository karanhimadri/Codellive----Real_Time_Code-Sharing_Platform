import React, { useState, useEffect } from "react";
import { Code, Users, GraduationCap, ArrowRight, Play, Star, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const HomePage = () => {
  // Mock navigation function for demo
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    fetch("https://codelive.rwinsight.site/api/ping")
      .then((res) => {
        if (!res.ok) setServerDown(true)
      })
      .catch(() => {
        setServerDown(true);
      });
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code with your team",
      description: "Open a Codeshare editor, write or copy code, then share it with friends and colleagues. Pair program and troubleshoot together in real-time.",
      buttonText: "Start Collaboration",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Interview developers",
      description: "Set coding tasks and observe in real-time when interviewing remotely or in person. Streamlined technical interviews made simple.",
      buttonText: "Begin Interview",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Teach programming",
      description: "Share your code with students and peers, then educate them effectively. Universities worldwide trust our platform for coding education.",
      buttonText: "Start Teaching",
      gradient: "from-green-500 to-teal-500"
    },
  ];

  const handleNavigation = () => {
    navigate("/code-space");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* WARNING CARD FOR SERVER STATUS */}
      {serverDown && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-yellow-100 border border-yellow-300 text-yellow-900 px-6 py-6 rounded-2xl shadow-xl max-w-lg w-full text-center animate-pulse-slow">

            {/* Close Button (UI Only) */}
            <button
              className="absolute top-3 right-3 text-yellow-900 hover:text-yellow-600 transition"
              aria-label="Close"
              onClick={() => setServerDown(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon + Title */}
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-800 mr-2" />
              <h2 className="text-xl font-semibold">Server is Down</h2>
            </div>

            {/* Message */}
            <p className="text-sm sm:text-base mb-4">
              Oops! Some features may not work right now. This happens when the backend server is sleeping or under maintenance.
              Please try again later or check the source code:
            </p>

            {/* GitHub Button */}
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/karanhimadri/Codellive----Real_Time_Code-Sharing_Platform.git"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
              >
                View on GitHub
              </a>
              <a
                onClick={() => { navigate("/contact"); setServerDown(false) }}
                rel="noopener noreferrer"
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      )}


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          {/* Hero Content */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 100,000+ developers worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Share Code in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real-time
              </span>
              <br />
              with Developers
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The most intuitive online code editor for interviews, collaboration, teaching, and troubleshooting.
              Code together, anywhere, anytime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleNavigation}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                Start Coding Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            <p className="text-sm text-gray-500">Free to use • No signup required • Works everywhere</p>
          </div>

          {/* Video Showcase */}
          <div className={`mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Main Video */}
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl p-2 shadow-2xl">
                    <video
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={assets.coding_video} type="video/mp4" />
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <Code className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                          <p className="text-gray-600">Demo Video Placeholder</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>

              {/* Side Videos */}
              <div className="hidden lg:flex flex-col gap-6">
                {[1, 2].map((index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white rounded-xl p-2 shadow-xl">
                      <video
                        className="w-full h-32 sm:h-40 lg:h-44 object-cover rounded-lg"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={assets.coding_video} type="video/mp4" />
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <Code className="w-8 h-8 text-green-500" />
                        </div>
                      </video>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <blockquote className="text-xl sm:text-2xl font-medium text-gray-700 italic">
            "Trusted by software engineers at leading companies and universities worldwide"
          </blockquote>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                code together
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're collaborating with teammates, conducting interviews, or teaching students,
              we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <button
                    onClick={handleNavigation}
                    className={`group/btn bg-gradient-to-r ${feature.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center`}
                  >
                    {feature.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to start coding together?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of developers who trust our platform for their coding needs.
          </p>

          <button
            onClick={handleNavigation}
            className="group bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-blue-100 mt-6 text-sm">
            No credit card required • Start in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
