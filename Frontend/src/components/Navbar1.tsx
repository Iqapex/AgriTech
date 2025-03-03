import { useState, useEffect } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 md:px-24 py-4 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl md:text-2xl">
              <span className="text-green-700">IQ</span>
              <span className="text-green-500">PONICS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
            <a href="#solutions" className="text-gray-700 hover:text-green-600 transition-colors">Solutions</a>
            <a href="#team" className="text-gray-700 hover:text-green-600 transition-colors">Team</a>
            <Link to="/login" className="btn-primary w-full">Get Started</Link>
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md py-4 px-4 flex flex-col space-y-4">
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>About</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#solutions" className="text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>Solutions</a>
            <a href="#team" className="text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>Team</a>
            <Link to="/login" className="btn-primary w-full">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;