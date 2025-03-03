import { useState } from 'react';
import { Search as SearchIcon, MapPin, User, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const lawyersData = [
  {
    name: "Amit Kumar",
    rating: 4.5,
    cases: 100,
    years: 14,
    about: "Experienced vendor specializing in bulk agricultural produce, ensuring fair trade for farmers.",
    location: "Guwahati",
    education: "Farmer College of Agriculture",
    experience: "14 years in farming and produce distribution",
  },
  {
    name: "Rajesh Verma",
    rating: 4.8,
    cases: 120,
    years: 16,
    about: "Specialist in organic produce distribution, helping farmers reach urban consumers.",
    location: "Gurugram",
    education: "National Institute of Organic Farming",
    experience: "16 years in organic farming",
  },
  {
    name: "Sunil Yadav",
    rating: 4.7,
    cases: 95,
    years: 12,
    about: "Dedicated to streamlining the supply chain for fresh fruits and vegetables.",
    location: "Goa",
    education: "Agricultural Business Management Institute",
    experience: "12 years in fresh produce distribution",
  },
  {
    name: "Pooja Sharma",
    rating: 4.9,
    cases: 150,
    years: 20,
    about: "Expert in bulk grain procurement, supporting small-scale farmers with stable demand.",
    location: "Delhi",
    education: "Indian Agricultural Research Institute",
    experience: "20 years in grain procurement and logistics",
  },
  {
    name: "Neeraj Patel",
    rating: 4.6,
    cases: 110,
    years: 15,
    about: "Works closely with dairy farmers to distribute fresh milk and dairy products.",
    location: "Bangalore",
    education: "Dairy Science Institute",
    experience: "15 years in dairy farming and milk distribution",
  },
  {
    name: "Vikram Singh",
    rating: 4.4,
    cases: 130,
    years: 18,
    about: "Focused on fair trade practices, ensuring farmers get the best market value.",
    location: "Ahmedabad",
    education: "Institute of Agricultural Marketing",
    experience: "18 years in agricultural trade and logistics",
  },
  {
    name: "Anita Desai",
    rating: 4.7,
    cases: 125,
    years: 14,
    about: "Leading vendor in spice distribution, bringing farm-fresh spices to the market.",
    location: "Mumbai",
    education: "Spice Board of India Certification",
    experience: "14 years in spice trade and export",
  },
  {
    name: "Suresh Reddy",
    rating: 4.5,
    cases: 90,
    years: 10,
    about: "Expert in handling direct-to-consumer sales for farm-fresh vegetables.",
    location: "Hyderabad",
    education: "Horticulture University",
    experience: "10 years in vegetable farming and retail",
  },
  {
    name: "Meera Joshi",
    rating: 4.8,
    cases: 105,
    years: 13,
    about: "Known for promoting sustainable farming products and fair pricing.",
    location: "Pune",
    education: "Institute of Sustainable Agriculture",
    experience: "13 years in sustainable farming practices",
  },
  {
    name: "Arjun Mehta",
    rating: 4.3,
    cases: 80,
    years: 9,
    about: "Strong network in wholesale grain markets, supporting local farmers.",
    location: "Chennai",
    education: "Tamil Nadu Agricultural University",
    experience: "9 years in grain wholesaling",
  },
  {
    name: "Kiran Chauhan",
    rating: 4.9,
    cases: 140,
    years: 22,
    about: "A veteran in agricultural logistics, ensuring smooth farm-to-market delivery.",
    location: "Jaipur",
    education: "National Institute of Agricultural Logistics",
    experience: "22 years in farm-to-market supply chain",
  },
  {
    name: "Roshni Malhotra",
    rating: 4.6,
    cases: 115,
    years: 17,
    about: "Extensive experience in organic and pesticide-free farming distribution.",
    location: "Kolkata",
    education: "Organic Farming Research Institute",
    experience: "17 years in organic farming and distribution",
  },
];


export default function Search() {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchName, setSearchName] = useState('');

  const filteredLawyers = lawyersData.filter(lawyer => {
    const matchesLocation = lawyer.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesName = lawyer.name.toLowerCase().includes(searchName.toLowerCase());
    return matchesLocation && matchesName;
  });

  return (
    <div className="min-h-screen bg-green-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Results ({filteredLawyers.length})</h2>
          <div className="space-y-4">
            {filteredLawyers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No lawyers found matching your criteria
              </div>
            ) : (
              filteredLawyers.map((lawyer, index) => (
                <div 
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-0 hover:bg-gray-50 transition-colors p-4 rounded-lg"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gray-200 rounded-full p-3">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{lawyer.name}</h3>
                      <p className="text-gray-600 mb-2">{lawyer.about}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lawyer.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {lawyer.rating}/5
                        </div>
                        <span>• {lawyer.years} years experience</span>
                      </div>
                    </div>
                    <Link 
                      to={`/lawyer/${lawyer.name}`}
                      className="self-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}