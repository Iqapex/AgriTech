import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, User, MapPin } from "lucide-react";

const lawyersData = [
  {
    name: "Jim Henson",
    rating: 4.5,
    cases: 100,
    years: 14,
    about:
      "Experienced lawyer in civil and corporate law, handling complex cases with great success.",
    location: "Guwahati",
  },
  {
    name: "Joseph Snyder",
    rating: 4.8,
    cases: 120,
    years: 16,
    about: "Specialist in family and property law with a strong track record.",
    location: "Gurugram",
  },
  {
    name: "Jason Tahiti",
    rating: 4.7,
    cases: 95,
    years: 12,
    about: "Dedicated to criminal defense cases with a high success rate.",
    location: "Goa",
  },
  {
    name: "Rajesh Sharma",
    rating: 4.9,
    cases: 150,
    years: 20,
    about:
      "Expert in constitutional and corporate law with high-profile cases.",
    location: "Delhi",
  },
  {
    name: "Ananya Iyer",
    rating: 4.6,
    cases: 110,
    years: 15,
    about: "Skilled in intellectual property and patent law.",
    location: "Bangalore",
  },
  {
    name: "Vikram Patel",
    rating: 4.4,
    cases: 130,
    years: 18,
    about: "Focused on criminal law and high-stakes litigation.",
    location: "Ahmedabad",
  },
  {
    name: "Neha Verma",
    rating: 4.7,
    cases: 125,
    years: 14,
    about: "Leading advocate in family and divorce law.",
    location: "Mumbai",
  },
  {
    name: "Siddharth Reddy",
    rating: 4.5,
    cases: 90,
    years: 10,
    about: "Expert in real estate and property disputes.",
    location: "Hyderabad",
  },
  {
    name: "Priya Desai",
    rating: 4.8,
    cases: 105,
    years: 13,
    about: "Known for her work in human rights and social justice cases.",
    location: "Pune",
  },
  {
    name: "Arjun Mehta",
    rating: 4.3,
    cases: 80,
    years: 9,
    about: "Strong background in taxation and financial law.",
    location: "Chennai",
  },
  {
    name: "Kiran Chauhan",
    rating: 4.9,
    cases: 140,
    years: 22,
    about: "A veteran lawyer specializing in business and corporate law.",
    location: "Jaipur",
  },
  {
    name: "Roshni Malhotra",
    rating: 4.6,
    cases: 115,
    years: 17,
    about: "Extensive experience in cyber law and technology disputes.",
    location: "Kolkata",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [filteredLawyers, setFilteredLawyers] = useState(lawyersData);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    filterLawyers(value, location, sortOption);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    filterLawyers(search, value, sortOption);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    filterLawyers(search, location, value);
  };

  const filterLawyers = (
    searchTerm: string,
    locationTerm: string,
    sortBy: string
  ) => {
    const filtered = lawyersData.filter(
      (lawyer) =>
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        lawyer.location.toLowerCase().includes(locationTerm.toLowerCase())
    );

    if (sortBy === "ratingLowToHigh") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "ratingHighToLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popularity") {
      filtered.sort((a, b) => b.cases - a.cases);
    }

    setFilteredLawyers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-6">
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md"
            />
            <MapPin className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          </div>
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search for lawyers all across the country"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md"
            />
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          </div>
          <div className="w-1/4">
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="none">Sort By</option>
              <option value="ratingLowToHigh">Rating: Low to High</option>
              <option value="ratingHighToLow">Rating: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Top Profiles</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-200 rounded-full p-4">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {lawyer.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-gray-600">{lawyer.rating}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {lawyer.cases}
                  </div>
                  <div className="text-sm text-gray-600">Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {lawyer.rating}
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {lawyer.years}
                  </div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{lawyer.about}</p>
              <p className="text-blue-600 text-sm font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {lawyer.location}
              </p>
              <Link
                to={`/lawyer/${lawyer.name}`}
                className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition block text-center"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
