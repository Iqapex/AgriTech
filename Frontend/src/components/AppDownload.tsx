import { useState, useEffect } from 'react';
import img1 from '/img1.png'
import img3 from '/img3.png'
import img2 from '/img2.png'
import { Apple, Smartphone, ArrowRight, Check, Download, Users, ShieldCheck, BarChart3 } from 'lucide-react';

const AppDownload = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const appScreens = [
    {
      title: "Join a Network of Trusted Farmers and Vendors",
      description: "The easiest way to reach from Farm to Vendor in just a few simple steps",
      image: img1
    },
    {
      title: "Track Your Produce in Real-Time",
      description: "Monitor your crops from farm to market with complete transparency",
      image: img2
    },
    {
      title: "Get Expert Agricultural Advice",
      description: "Connect with agricultural specialists for personalized guidance",
      image: img3
    }
  ];
  
  const features = [
    { icon: <Users size={20} />, text: "Connect with 500+ farmers and vendors" },
    { icon: <BarChart3 size={20} />, text: "Real-time price predictions" },
    { icon: <ShieldCheck size={20} />, text: "Secure blockchain transactions" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveScreen((prev) => (prev + 1) % appScreens.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [appScreens.length]);
  
  return (
    <section className="section-padding bg-gradient-to-b from-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="fade-in-section">
          <h2 className="section-title">
            Download Our <span className="gradient-text">Mobile App</span>
          </h2>
          <p className="section-subtitle">
            Experience the future of agriculture in the palm of your hand
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div className="fade-in-section order-2 md:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{appScreens[activeScreen].title}</h3>
              <p className="text-gray-600">
                {appScreens[activeScreen].description}
              </p>
              
              <div className="space-y-4 mt-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <button className="btn-primary flex items-center justify-center gap-2 group">
                  <Apple size={20} />
                  <div className="text-left">
                    <span className="text-xs block">Download on the</span>
                    <span className="font-medium">App Store</span>
                  </div>
                  <Download size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button className="btn-primary flex items-center justify-center gap-2 group">
                  <Smartphone size={20} />
                  <div className="text-left">
                    <span className="text-xs block">Get it on</span>
                    <span className="font-medium">Google Play</span>
                  </div>
                  <Download size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
              
              <div className="pt-6">
                <div className="flex items-center gap-2 text-green-700 group cursor-pointer">
                  <span className="font-medium group-hover:underline">View all app features</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="fade-in-section order-1 md:order-2 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative z-10">
                <div className="bg-gray-900 p-3 rounded-[3rem] shadow-2xl phone-shadow">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-xl z-20"></div>
                  
                  {/* Screen */}
                  <div className="rounded-[2.5rem] overflow-hidden h-[600px] w-[300px] relative">
                    <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                      <img 
                        src={appScreens[activeScreen].image}
                        alt={`App Screen ${activeScreen + 1}`}
                        className="scale-110 object-cover"
                      />
                    </div>
                    
                    {/* Screen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-6">
                      <div className="space-y-2">
                        <h4 className="text-white text-xl font-bold">{appScreens[activeScreen].title}</h4>
                        <p className="text-white/80 text-sm">{appScreens[activeScreen].description}</p>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mt-2 flex items-center gap-2">
                          Get Started <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone Buttons */}
                <div className="absolute right-[-2px] top-[120px] w-1 h-16 bg-gray-800 rounded-l-md"></div>
                <div className="absolute left-[-2px] top-[100px] w-1 h-12 bg-gray-800 rounded-r-md"></div>
                <div className="absolute left-[-2px] top-[150px] w-1 h-12 bg-gray-800 rounded-r-md"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-[-30px] right-[-40px] bg-white p-4 rounded-lg shadow-lg z-20 animate-float">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Easy to use</p>
                </div>
              </div>
              
              <div className="absolute bottom-[100px] left-[-60px] bg-white p-4 rounded-lg shadow-lg z-20 animate-float animation-delay-2000">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Users size={16} className="text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">500+ Farmers</p>
                </div>
              </div>
              
              <div className="absolute bottom-[-20px] right-[20px] bg-white p-4 rounded-lg shadow-lg z-20 animate-float animation-delay-4000">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <BarChart3 size={16} className="text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Real-time data</p>
                </div>
              </div>
              
              {/* Screen Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {appScreens.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      activeScreen === index ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setActiveScreen(index);
                        setIsAnimating(false);
                      }, 500);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;