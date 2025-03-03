import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, User, MapPin, Check, Plus } from "lucide-react";

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
    contacts: ["Ajay Gupta", "Hrithik Ghanty", "Soumya Sen"],
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
    contacts: ["Meham Chaudhary", "Abhishek Sharma", "Sunny Kumar"],
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
    contacts: ["Rahul Tiwari", "Nikhil Chauhan", "Pooja Agarwal"],
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
    contacts: ["Anil Mehta", "Shruti Das", "Manoj Bansal"],
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
    contacts: ["Karthik Nair", "Prerna Singh", "Deepak Sinha"],
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
    contacts: ["Raj Malhotra", "Sonia Kapoor", "Amit Khanna"],
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
    contacts: ["Suresh Mehta", "Anjali Rao", "Devika Nanda"],
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
    contacts: ["Ravi Teja", "Bhavani Shankar", "Jaya Krishna"],
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
    contacts: ["Yashwant Jadhav", "Sneha Kulkarni", "Rohan Deshpande"],
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
    contacts: ["Naveen Kumar", "Varsha Iyer", "Kiran Babu"],
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
    contacts: ["Shubham Rathore", "Dinesh Gupta", "Priyanka Sharma"],
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
    contacts: ["Alok Banerjee", "Neha Sen", "Vivek Roy"],
  },
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
    <div className="min-h-screen bg-gray-50 pt-20 px-4 mb-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-green-400  to-green-700 p-8">
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
                  : "bg-white hover:bg-blue-50 text-green-600"
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
              <h3 className="font-semibold mb-4">Orders Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total orders</span>
                  <span className="font-semibold text-green-600">{lawyer.cases}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Experience Years</span>
                  <span className="font-semibold text-green-600">{lawyer.years}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-semibold text-green-600">{(lawyer.rating * 20).toFixed(1)}%</span>
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
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
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