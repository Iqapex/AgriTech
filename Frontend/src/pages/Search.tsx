import { useState } from 'react';
import { Search as SearchIcon, MapPin, User, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const lawyersData = [
  {
    name: "Jim Henson",
    rating: 4.5,
    cases: 100,
    years: 14,
    about: "Experienced in civil and corporate law",
    location: "Guwahati",
    education: "Harvard Law School",
    experience: "14 years in corporate law"
  },
  {
    name: "Joseph Snyder",
    rating: 4.8,
    cases: 120,
    years: 16,
    about: "Specialist in family and property law",
    location: "Gurugram",
    education: "Yale Law School",
    experience: "16 years in family law"
  },
  {
    name: "Rohan Mehta",
    rating: 4.7,
    cases: 200,
    years: 15,
    about: "Corporate law expert",
    location: "Mumbai",
    education: "NLSIU",
    experience: "15 years in corporate litigation"
  },
  {
    name: "Priya Sharma",
    rating: 4.8,
    cases: 150,
    years: 10,
    about: "Family law specialist",
    location: "Bangalore",
    education: "Symbiosis Law School",
    experience: "10 years in family law"
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
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="self-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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