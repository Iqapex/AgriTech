import { Leaf, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="font-bold text-2xl">
                <span className="text-green-400">IQ</span>
                <span className="text-green-300">PONICS</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Revolutionizing agriculture through technology, empowering farmers with market linkages, fair pricing, and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</a></li>
              <li><a href="#tech" className="text-gray-400 hover:text-white transition-colors">Technology</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Market Linkage</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Price Prediction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Agricultural Advisory</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">IoT Monitoring</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blockchain Traceability</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Kolkata, West Bengal, India</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@iqponics.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} IQPONICS TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;