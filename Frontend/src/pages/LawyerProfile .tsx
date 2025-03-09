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
//   education: string;
//   experience: string;
//   contacts: string[];
//   profilePic: string;
// }

// export default function LawyerProfile() {
//   const { name } = useParams(); // Get lawyer ID from URL
//   const [lawyer, setLawyer] = useState<Lawyer | null>(null);
//   const [isAdded, setIsAdded] = useState(false);
//   const [loading, setLoading] = useState(true);

//   console.log("Auth Token:", localStorage.getItem("authToken"));

//   useEffect(() => {
//     const fetchLawyerDetails = async () => {
//       if (!name) {
//         console.error("Lawyer ID is undefined! Check the URL structure.");
//         return;
//       }

//       const token = localStorage.getItem("authToken");

//       console.log("Auth Token:", token);
//       console.log("Lawyer ID:", name);

//       try {
//         const res = await fetch(`http://localhost:5000/api/users/${name}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error(
//             `Failed to fetch lawyer details: ${res.status} ${res.statusText}`
//           );
//         }

//         const data = await res.json();
//         console.log("Fetched Lawyer Data:", data);

//         setLawyer({
//           _id: data._id,
//           name: `${data.firstname} ${
//             data.middlename ? data.middlename + " " : ""
//           }${data.lastname}`,
//           rating: data.rating?.length
//             ? data.rating.reduce(
//                 (sum: number, r: { rating: number }) => sum + r.rating,
//                 0
//               ) / data.rating.length
//             : 0,
//           cases: data.noOfCases || 0,
//           years: data.yearsOfExperience || 0,
//           about: data.summary,
//           location: data.geoLocation?.city || "Unknown",
//           education: data.education || "Not Available",
//           experience: `${data.yearsOfExperience} years of experience`,
//           contacts: data.contacts || [],
//           profilePic: data.profilePic || "",
//         });
//       } catch (error) {
//         console.error("Error fetching lawyer details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLawyerDetails();
//   }, [name]);

//   if (loading) {
//     return <div className="text-center text-gray-600 p-8">Loading...</div>;
//   }

//   if (!lawyer) {
//     return (
//       <div className="text-center text-gray-600 p-8">Lawyer not found</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-20 px-4 mb-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//         {/* Profile Header */}
//         <div className="relative bg-gradient-to-r from-green-400 to-green-700 p-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
//             <div className="w-32 h-32 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center overflow-hidden">
//               {lawyer.profilePic ? (
//                 <img
//                   src={lawyer.profilePic}
//                   alt={lawyer.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
//               )}
//             </div>
//             <div className="space-y-2 text-white">
//               <h1 className="text-3xl font-bold">{lawyer.name}</h1>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
//                   <Star className="w-5 h-5 text-yellow-400" />
//                   <span className="ml-1">{lawyer.rating.toFixed(1)}</span>
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
//                 {Array.isArray(lawyer.education) ? (
//                   lawyer.education.map((edu, index) => (
//                     <p key={edu._id || index} className="text-gray-600">
//                       {edu.institute}
//                     </p>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">{lawyer.education}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
//               <h3 className="font-semibold mb-4">Orders Statistics</h3>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span>Total Orders</span>
//                   <span className="font-semibold text-green-600">
//                     {lawyer.cases}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Experience Years</span>
//                   <span className="font-semibold text-green-600">
//                     {lawyer.years}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Success Rate</span>
//                   <span className="font-semibold text-green-600">
//                     {(lawyer.rating * 20).toFixed(1)}%
//                   </span>
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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, User, MapPin, Check, Plus } from "lucide-react";

interface Lawyer {
  _id: string;
  name: string;
  rating: number;
  cases: number;
  years: number;
  about: string;
  location: string;
  education: string;
  experience: string;
  contacts: string[];
  profilePic: string;
}

export default function LawyerProfile() {
  const { name } = useParams(); // Lawyer ID from URL
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLawyerDetails = async () => {
      if (!name) {
        console.error("Lawyer ID is undefined! Check the URL structure.");
        setError("Lawyer ID is undefined");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("authToken");

      try {
        const res = await fetch(`http://localhost:5000/api/users/${name}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(
            `Failed to fetch lawyer details: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        setLawyer({
          _id: data._id,
          name: `${data.firstname} ${data.middlename ? data.middlename + " " : ""}${data.lastname}`,
          rating: data.rating?.length
            ? data.rating.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / data.rating.length
            : 0,
          cases: data.noOfCases || 0,
          years: data.yearsOfExperience || 0,
          about: data.summary,
          location: data.geoLocation?.city || "Unknown",
          education: data.education || "Not Available",
          experience: `${data.yearsOfExperience || 0} years of experience`,
          contacts: data.contacts || [],
          profilePic: data.profilePic || "",
        });
      } catch (error: any) {
        console.error("Error fetching lawyer details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyerDetails();
  }, [name]);

  const handleAddContact = async () => {
    if (!lawyer) return;
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:5000/api/users/${lawyer._id}/requestConnect`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to send connection request");
      }
      const result = await res.json();
      console.log("Connection request sent:", result);
      setIsAdded(true);
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 p-8">Loading...</div>;
  }

  if (error || !lawyer) {
    return <div className="text-center text-gray-600 p-8">Lawyer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 mb-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-green-400 to-green-700 p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="w-32 h-32 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center overflow-hidden">
              {lawyer.profilePic ? (
                <img
                  src={lawyer.profilePic}
                  alt={lawyer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white/90" strokeWidth={1.5} />
              )}
            </div>
            <div className="space-y-2 text-white">
              <h1 className="text-3xl font-bold">{lawyer.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="ml-1">{lawyer.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  {lawyer.location}
                </div>
              </div>
            </div>
            <button
              onClick={handleAddContact}
              disabled={isAdded}
              className={`ml-auto flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                isAdded
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white hover:bg-blue-50 text-green-600"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Request Sent
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
                {Array.isArray(lawyer.education) ? (
                  lawyer.education.map((edu, index) => (
                    <p key={edu._id || index} className="text-gray-600">
                      {edu.institute}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">{lawyer.education}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-md">
              <h3 className="font-semibold mb-4">Orders Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Orders</span>
                  <span className="font-semibold text-green-600">
                    {lawyer.cases}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Experience Years</span>
                  <span className="font-semibold text-green-600">
                    {lawyer.years}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-semibold text-green-600">
                    {(lawyer.rating * 20).toFixed(1)}%
                  </span>
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

