// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Star, User, MapPin, Check, Plus } from "lucide-react";

// const lawyersData = [
//   {
//     name: "Amit Kumar",
//     rating: 4.5,
//     cases: 100,
//     years: 14,
//     about: "Experienced vendor specializing in bulk agricultural produce, ensuring fair trade for farmers.",
//     location: "Guwahati",
//     education: "Farmer College of Agriculture",
//     experience: "14 years in farming and produce distribution",
//     contacts: ["Ajay Gupta", "Hrithik Ghanty", "Soumya Sen"],
//   },
//   {
//     name: "Rajesh Verma",
//     rating: 4.8,
//     cases: 120,
//     years: 16,
//     about: "Specialist in organic produce distribution, helping farmers reach urban consumers.",
//     location: "Gurugram",
//     education: "National Institute of Organic Farming",
//     experience: "16 years in organic farming",
//     contacts: ["Meham Chaudhary", "Abhishek Sharma", "Sunny Kumar"],
//   },
//   {
//     name: "Sunil Yadav",
//     rating: 4.7,
//     cases: 95,
//     years: 12,
//     about: "Dedicated to streamlining the supply chain for fresh fruits and vegetables.",
//     location: "Goa",
//     education: "Agricultural Business Management Institute",
//     experience: "12 years in fresh produce distribution",
//     contacts: ["Rahul Tiwari", "Nikhil Chauhan", "Pooja Agarwal"],
//   },
//   {
//     name: "Pooja Sharma",
//     rating: 4.9,
//     cases: 150,
//     years: 20,
//     about: "Expert in bulk grain procurement, supporting small-scale farmers with stable demand.",
//     location: "Delhi",
//     education: "Indian Agricultural Research Institute",
//     experience: "20 years in grain procurement and logistics",
//     contacts: ["Anil Mehta", "Shruti Das", "Manoj Bansal"],
//   },
//   {
//     name: "Neeraj Patel",
//     rating: 4.6,
//     cases: 110,
//     years: 15,
//     about: "Works closely with dairy farmers to distribute fresh milk and dairy products.",
//     location: "Bangalore",
//     education: "Dairy Science Institute",
//     experience: "15 years in dairy farming and milk distribution",
//     contacts: ["Karthik Nair", "Prerna Singh", "Deepak Sinha"],
//   },
//   {
//     name: "Roshni Malhotra",
//     rating: 4.6,
//     cases: 115,
//     years: 17,
//     about: "Extensive experience in organic and pesticide-free farming distribution.",
//     location: "Kolkata",
//     education: "Organic Farming Research Institute",
//     experience: "17 years in organic farming and distribution",
//     contacts: ["Alok Banerjee", "Neha Sen", "Vivek Roy"],
//   },
// ];



// export default function LawyerProfile() {
//   const { name } = useParams();
//   const [lawyer, setLawyer] = useState<typeof lawyersData[0] | undefined>(undefined);
//   const [isAdded, setIsAdded] = useState(false);

//   useEffect(() => {
//     const foundLawyer = lawyersData.find((lawyer) => lawyer.name === name);
//     setLawyer(foundLawyer);
//   }, [name]);

//   if (!lawyer) {
//     return <div className="text-center text-gray-600 p-8">Lawyer not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4 mb-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Profile Header */}
//         <div className="relative bg-gradient-to-r from-green-400  to-green-700 p-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
//             <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
//               <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
//             </div>
//             <div className="space-y-2 text-white">
//               <h1 className="text-3xl font-bold">{lawyer.name}</h1>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
//                   <Star className="w-5 h-5 text-yellow-400" />
//                   <span className="ml-1">{lawyer.rating}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <MapPin className="w-5 h-5 mr-1" />
//                   {lawyer.location}
//                 </div>
//               </div>
//             </div>
//             <button 
//               onClick={() => setIsAdded(!isAdded)}
//               className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
//                 isAdded 
//                   ? "bg-green-500 hover:bg-green-600 text-white"
//                   : "bg-white hover:bg-blue-50 text-green-600"
//               }`}
//             >
//               {isAdded ? (
//                 <>
//                   <Check className="w-5 h-5" />
//                   Added
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-5 h-5" />
//                   Add to Contacts
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8 p-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//               <h2 className="text-xl font-semibold mb-4">About</h2>
//               <p className="text-gray-600 leading-relaxed">{lawyer.about}</p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//                 <h3 className="font-semibold mb-3">Experience</h3>
//                 <p className="text-gray-600">{lawyer.experience}</p>
//               </div>
//               <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//                 <h3 className="font-semibold mb-3">Education</h3>
//                 <p className="text-gray-600">{lawyer.education}</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//               <h3 className="font-semibold mb-4">Orders Statistics</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span>Total orders</span>
//                   <span className="font-semibold text-green-600">{lawyer.cases}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Experience Years</span>
//                   <span className="font-semibold text-green-600">{lawyer.years}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Success Rate</span>
//                   <span className="font-semibold text-green-600">{(lawyer.rating * 20).toFixed(1)}%</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//               <h3 className="font-semibold mb-4">Contacts</h3>
//               <ul className="space-y-3">
//                 {lawyer.contacts.map((contact, index) => (
//                   <li 
//                     key={index}
//                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition"
//                   >
//                     <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                       <User className="w-4 h-4 text-green-600" />
//                     </div>
//                     <span className="text-gray-600">{contact}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Star, User, MapPin, Check, Plus } from "lucide-react";

// interface Lawyer {
//   _id: string;
//   name: string;
//   rating: number;
//   cases: number;
//   years: number;
//   about: string;
//   location: string;
//   education?: string;
//   experience?: string;
//   contacts?: string[];
// }

// export default function LawyerProfile() {
//   // Assuming the route is now /lawyer/:userId
//   const { userId } = useParams<{ userId: string }>();
//   const [lawyer, setLawyer] = useState<Lawyer | null>(null);
//   const [isAdded, setIsAdded] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Assume the JWT token and current user info are stored in localStorage
//   const token = localStorage.getItem("token");
//   const currentUser = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")!)
//     : null;

//   useEffect(() => {
//     async function fetchLawyer() {
//       try {
//         const res = await fetch(`/user/${userId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!res.ok) {
//           throw new Error("Failed to fetch profile");
//         }
//         const data = await res.json();
//         setLawyer(data);
//         // If the lawyer's contacts include the logged-in user's id, mark as added.
//         if (data.contacts && currentUser) {
//           setIsAdded(data.contacts.includes(currentUser._id));
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchLawyer();
//   }, [userId, token, currentUser]);

//   const handleAddOrCancel = async () => {
//     if (!lawyer) return;
//     try {
//       if (!isAdded) {
//         // Send connection request
//         const res = await fetch(`/user/${lawyer._id}/requestConnect`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await res.json();
//         if (res.ok) {
//           setIsAdded(true);
//         } else {
//           alert(result.message);
//         }
//       } else {
//         // Cancel request or disconnect
//         const res = await fetch(`/user/${lawyer._id}/deleteConnect`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await res.json();
//         if (res.ok) {
//           setIsAdded(false);
//         } else {
//           alert(result.message);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-gray-600 p-8">Loading...</div>;
//   }

//   if (!lawyer) {
//     return <div className="text-center text-gray-600 p-8">Lawyer not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4 mb-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Profile Header */}
//         <div className="relative bg-gradient-to-r from-green-400 to-green-700 p-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
//             <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
//               <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
//             </div>
//             <div className="space-y-2 text-white">
//               <h1 className="text-3xl font-bold">{lawyer.name}</h1>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
//                   <Star className="w-5 h-5 text-yellow-400" />
//                   <span className="ml-1">{lawyer.rating}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <MapPin className="w-5 h-5 mr-1" />
//                   {lawyer.location}
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={handleAddOrCancel}
//               className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
//                 isAdded
//                   ? "bg-green-500 hover:bg-green-600 text-white"
//                   : "bg-white hover:bg-blue-50 text-green-600"
//               }`}
//             >
//               {isAdded ? (
//                 <>
//                   <Check className="w-5 h-5" />
//                   Cancel Request
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-5 h-5" />
//                   Add to Contacts
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8 p-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//               <h2 className="text-xl font-semibold mb-4">About</h2>
//               <p className="text-gray-600 leading-relaxed">{lawyer.about}</p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {lawyer.experience && (
//                 <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//                   <h3 className="font-semibold mb-3">Experience</h3>
//                   <p className="text-gray-600">{lawyer.experience}</p>
//                 </div>
//               )}
//               {lawyer.education && (
//                 <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//                   <h3 className="font-semibold mb-3">Education</h3>
//                   <p className="text-gray-600">{lawyer.education}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//               <h3 className="font-semibold mb-4">Orders Statistics</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span>Total orders</span>
//                   <span className="font-semibold text-green-600">{lawyer.cases}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Experience Years</span>
//                   <span className="font-semibold text-green-600">{lawyer.years}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Success Rate</span>
//                   <span className="font-semibold text-green-600">{(lawyer.rating * 20).toFixed(1)}%</span>
//                 </div>
//               </div>
//             </div>

//             {lawyer.contacts && (
//               <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//                 <h3 className="font-semibold mb-4">Contacts</h3>
//                 <ul className="space-y-3">
//                   {lawyer.contacts.map((contact, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition"
//                     >
//                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
//                         <User className="w-4 h-4 text-green-600" />
//                       </div>
//                       <span className="text-gray-600">{contact}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, User, MapPin } from "lucide-react";

interface Lawyer {
  _id: string;
  firstname: string;
  lastname: string;
  rating: { rating: number }[];
  noOfCases: number;
  yearsOfExperience: number;
  about: string;
  geoLocation: { city: string };
  isLawyer: boolean;
  profilePic?: string;
}

export default function LawyerProfiles() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token"); // Replace "token" with your actual key

  if (token) {
      console.log("Token found:", token);
  } else {
      console.log("No token found");
  }

  const fetchLawyers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/users/search/lawyers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: "", // Fetch all lawyers
          city: "", // Fetch all lawyers
        }),
      });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error("Access denied. Please log in again.");
        } else {
          throw new Error("Failed to fetch lawyers");
        }
      }

      const data = await res.json();
      setLawyers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [token]);

  if (loading) {
    return <div className="text-center text-gray-600 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Lawyer Profiles</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gray-200 rounded-full p-4">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {lawyer.firstname} {lawyer.lastname}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-gray-600">
                      {lawyer.rating && lawyer.rating.length > 0
                        ? (
                            lawyer.rating.reduce((sum, r) => sum + r.rating, 0) /
                            lawyer.rating.length
                          ).toFixed(1)
                        : "0.0"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {lawyer.noOfCases}
                  </div>
                  <div className="text-sm text-gray-600">Cases</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {lawyer.rating && lawyer.rating.length > 0
                      ? (
                          lawyer.rating.reduce((sum, r) => sum + r.rating, 0) /
                          lawyer.rating.length
                        ).toFixed(1)
                      : "0.0"}
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {lawyer.yearsOfExperience}
                  </div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{lawyer.about}</p>
              <p className="text-green-600 text-sm font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {lawyer.geoLocation.city}
              </p>
              <Link
                to={`/lawyer/${lawyer._id}`}
                className="w-full bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-700 transition block text-center"
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