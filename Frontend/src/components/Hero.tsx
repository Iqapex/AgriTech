import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 pt-24">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Seeding Trust • Growing Prosperity</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">AGRIDA</span>
            <span className="block md:inline"> X </span>
            <span className="gradient-text">TECH</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-10">
            Revolutionizing agriculture through technology, empowering farmers with market linkages, fair pricing, and sustainable practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to='/login' className="btn-primary flex items-center justify-center gap-2">
              Get Started <ArrowRight size={18} />
            </Link>
            <button className="btn-secondary">Learn More</button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToNext}>
            <ChevronDown size={32} className="text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;