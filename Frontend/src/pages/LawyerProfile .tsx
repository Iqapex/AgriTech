import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, User, MapPin, Check, Plus } from "lucide-react";

const lawyersData = [
  {
    name: "Jim Henson",
    rating: 4.5,
    cases: 100,
    years: 14,
    about: "Experienced lawyer in civil and corporate law, handling complex cases with great success.",
    location: "Guwahati",
    education: "Harvard Law School",
    experience: "14 years in corporate law",
    contacts: ["Ajay Gupta", "Hrithik Ghanty", "Soumya Sen"]
  },
  {
    name: "Joseph Snyder",
    rating: 4.8,
    cases: 120,
    years: 16,
    about: "Specialist in family and property law with a strong track record.",
    location: "Gurugram",
    education: "Yale Law School",
    experience: "16 years in family law",
    contacts: ["Michael Scott", "Dwight Schrute", "Pam Beesly"]
  }
];

export default function LawyerProfile() {
  const { name } = useParams();
  const [lawyer, setLawyer] = useState<typeof lawyersData[0] | undefined>(undefined);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const foundLawyer = lawyersData.find((lawyer) => lawyer.name === name);
    setLawyer(foundLawyer);
  }, [name]);

  if (!lawyer) {
    return <div className="text-center text-gray-600 p-8">Lawyer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
              <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
            </div>
            <div className="space-y-2 text-white">
              <h1 className="text-3xl font-bold">{lawyer.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{lawyer.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  {lawyer.location}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsAdded(!isAdded)}
              className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                isAdded 
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white hover:bg-blue-50 text-blue-600"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add to Contacts
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 p-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{lawyer.about}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
                <h3 className="font-semibold mb-3">Experience</h3>
                <p className="text-gray-600">{lawyer.experience}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
                <h3 className="font-semibold mb-3">Education</h3>
                <p className="text-gray-600">{lawyer.education}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
              <h3 className="font-semibold mb-4">Case Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Cases</span>
                  <span className="font-semibold text-blue-600">{lawyer.cases}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Experience Years</span>
                  <span className="font-semibold text-blue-600">{lawyer.years}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-semibold text-blue-600">{(lawyer.rating * 20).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
              <h3 className="font-semibold mb-4">Contacts</h3>
              <ul className="space-y-3">
                {lawyer.contacts.map((contact, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-600">{contact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}