// import { useState, useEffect } from 'react';
// import { User, Search, Clock, Check, X } from 'lucide-react';

// interface ContactRequest {
//   id: string;
//   name: string;
//   timestamp: number;
// }

// export default function Contacts() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [pendingContacts, setPendingContacts] = useState<ContactRequest[]>([]);
//   const [acceptedContacts, setAcceptedContacts] = useState<string[]>([]);

//   // Load from localStorage on mount
//   useEffect(() => {
//     const savedPending = localStorage.getItem('pendingContacts');
//     const savedAccepted = localStorage.getItem('acceptedContacts');
    
//     if (savedPending) setPendingContacts(JSON.parse(savedPending));
//     if (savedAccepted) setAcceptedContacts(JSON.parse(savedAccepted));
//   }, []);

//   // Save to localStorage whenever state changes
//   useEffect(() => {
//     localStorage.setItem('pendingContacts', JSON.stringify(pendingContacts));
//     localStorage.setItem('acceptedContacts', JSON.stringify(acceptedContacts));
//   }, [pendingContacts, acceptedContacts]);

//   const handleAccept = (request: ContactRequest) => {
//     // Add to accepted and remove from pending
//     setAcceptedContacts(prev => [...prev, request.name]);
//     setPendingContacts(prev => prev.filter(item => item.id !== request.id));
//   };

//   const handleDecline = (requestId: string) => {
//     // Remove from pending
//     setPendingContacts(prev => prev.filter(item => item.id !== requestId));
//   };

//   const filteredAcceptedContacts = acceptedContacts.filter(name =>
//     name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-green-50 pt-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Pending Requests Column */}
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search contacts"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>

//               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-amber-500" />
//                 Pending Requests ({pendingContacts.length})
//               </h2>
              
//               <div className="space-y-3">
//                 {pendingContacts.length === 0 ? (
//                   <div className="text-gray-400 text-center py-6">
//                     No pending requests
//                   </div>
//                 ) : (
//                   pendingContacts.map((request) => (
//                     <div 
//                       key={request.id}
//                       className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="bg-green-100 rounded-full p-2">
//                           <User className="w-5 h-5 text-green-600" />
//                         </div>
//                         <div>
//                           <span className="font-medium block">{request.name}</span>
//                           <span className="text-sm text-gray-500">
//                             Requested {new Date(request.timestamp).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleAccept(request)}
//                           className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
//                           aria-label="Accept request"
//                         >
//                           <Check className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDecline(request.id)}
//                           className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
//                           aria-label="Decline request"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Accepted Contacts Column */}
//           <div className="md:col-span-1">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                 <User className="w-5 h-5 text-green-500" />
//                 Your Contacts ({acceptedContacts.length})
//               </h2>
              
//               <div className="space-y-3">
//                 {filteredAcceptedContacts.length === 0 ? (
//                   <div className="text-gray-400 text-center py-6">
//                     No contacts yet
//                   </div>
//                 ) : (
//                   filteredAcceptedContacts.map((name, index) => (
//                     <div 
//                       key={index}
//                       className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       <div className="bg-green-100 rounded-full p-2">
//                         <User className="w-5 h-5 text-green-600" />
//                       </div>
//                       <span className="text-gray-800">{name}</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { User, Search, Clock, Check, X } from "lucide-react";

// interface Contact {
//   _id: string;
//   firstname: string;
//   lastname: string;
//   isLawyer: boolean;
//   profilePic?: string;
// }

// interface PendingRequest {
//   id: string; // The requester’s user ID
//   name: string; // Name of the requester (could be combined from firstname/lastname)
//   timestamp: number;
// }

// export default function Contacts() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [pendingContacts, setPendingContacts] = useState<PendingRequest[]>([]);
//   const [acceptedContacts, setAcceptedContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token");
//   const currentUser = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")!)
//     : null;

//   useEffect(() => {
//     async function fetchContacts() {
//       if (!currentUser) return;
//       try {
//         // Fetch accepted contacts
//         const resAccepted = await fetch(`/user/contacts/${currentUser._id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           }
//         });
//         if (!resAccepted.ok) throw new Error("Failed to fetch accepted contacts");
//         const acceptedData = await resAccepted.json();
//         setAcceptedContacts(acceptedData);

//         // Fetch pending contacts (assumes such an endpoint exists)
//         const resPending = await fetch(`/user/pendingContacts/${currentUser._id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           }
//         });
//         if (!resPending.ok) throw new Error("Failed to fetch pending contacts");
//         const pendingData = await resPending.json();
//         setPendingContacts(pendingData);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchContacts();
//   }, [currentUser, token]);

//   const handleAccept = async (request: PendingRequest) => {
//     try {
//       const res = await fetch(`/user/${request.id}/acceptConnect`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const result = await res.json();
//       if (res.ok) {
//         // Remove the accepted request from pending list
//         setPendingContacts(prev => prev.filter(item => item.id !== request.id));
//         // Optionally, update accepted contacts (either by re-fetching or appending)
//         setAcceptedContacts(prev => [
//           ...prev,
//           { _id: request.id, firstname: request.name, lastname: "", isLawyer: false }
//         ]);
//       } else {
//         alert(result.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDecline = async (requestId: string) => {
//     try {
//       const res = await fetch(`/user/${requestId}/deleteConnect`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const result = await res.json();
//       if (res.ok) {
//         setPendingContacts(prev => prev.filter(item => item.id !== requestId));
//       } else {
//         alert(result.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredAcceptedContacts = acceptedContacts.filter(contact =>
//     `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-green-50 pt-20 px-4">
//       <div className="max-w-7xl mx-auto">
//         {loading ? (
//           <div className="text-center text-gray-600">Loading contacts...</div>
//         ) : (
//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Pending Requests Column */}
//             <div className="md:col-span-2">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="relative mb-6">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search contacts"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                 </div>

//                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-amber-500" />
//                   Pending Requests ({pendingContacts.length})
//                 </h2>
                
//                 <div className="space-y-3">
//                   {pendingContacts.length === 0 ? (
//                     <div className="text-gray-400 text-center py-6">
//                       No pending requests
//                     </div>
//                   ) : (
//                     pendingContacts.map((request) => (
//                       <div 
//                         key={request.id}
//                         className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="bg-green-100 rounded-full p-2">
//                             <User className="w-5 h-5 text-green-600" />
//                           </div>
//                           <div>
//                             <span className="font-medium block">{request.name}</span>
//                             <span className="text-sm text-gray-500">
//                               Requested {new Date(request.timestamp).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleAccept(request)}
//                             className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
//                             aria-label="Accept request"
//                           >
//                             <Check className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => handleDecline(request.id)}
//                             className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
//                             aria-label="Decline request"
//                           >
//                             <X className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Accepted Contacts Column */}
//             <div className="md:col-span-1">
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <User className="w-5 h-5 text-green-500" />
//                   Your Contacts ({acceptedContacts.length})
//                 </h2>
                
//                 <div className="space-y-3">
//                   {filteredAcceptedContacts.length === 0 ? (
//                     <div className="text-gray-400 text-center py-6">
//                       No contacts yet
//                     </div>
//                   ) : (
//                     filteredAcceptedContacts.map((contact) => (
//                       <div 
//                         key={contact._id}
//                         className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
//                       >
//                         <div className="bg-green-100 rounded-full p-2">
//                           <User className="w-5 h-5 text-green-600" />
//                         </div>
//                         <span className="text-gray-800">
//                           {contact.firstname} {contact.lastname}
//                         </span>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { User, Check, X, Clock } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
}

interface PendingContact {
  _id: string;
  name: string;
  timestamp: number;
}

export default function Contacts() {
  const [pending, setPending] = useState<PendingContact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user data
        const userRes = await fetch('/api/users/me', {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
        
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        
        const user = await userRes.json();

        // Fetch pending contacts details
        const pendingRequests = await Promise.all(
          user.pendingContacts.map(async (pc: any) => {
            const res = await fetch(`/api/users/${pc.contactorId}`);
            if (!res.ok) throw new Error('Failed to fetch contact details');
            const data = await res.json();
            return { 
              _id: pc.contactorId,
              name: `${data.firstname} ${data.lastname}`,
              timestamp: pc.timestamp
            };
          })
        );

        // Fetch accepted contacts
        const acceptedContacts = await Promise.all(
          user.contacts.map(async (id: string) => {
            const res = await fetch(`/api/users/${id}`);
            if (!res.ok) throw new Error('Failed to fetch contact details');
            const data = await res.json();
            return {
              _id: id,
              name: `${data.firstname} ${data.lastname}`
            };
          })
        );

        setPending(pendingRequests);
        setContacts(acceptedContacts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (contactorId: string) => {
    try {
      const res = await fetch(`/api/users/${contactorId}/acceptConnect`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      
      if (!res.ok) throw new Error('Failed to accept request');
      
      setPending(prev => prev.filter(p => p._id !== contactorId));
      setContacts(prev => [...prev, { 
        _id: contactorId, 
        name: pending.find(p => p._id === contactorId)?.name || '' 
      }]);
    } catch (err) {
      console.error('Accept failed:', err);
    }
  };

  const handleDecline = async (contactorId: string) => {
    try {
      const res = await fetch(`/api/users/${contactorId}/declineConnect`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      
      if (!res.ok) throw new Error('Failed to decline request');
      
      setPending(prev => prev.filter(p => p._id !== contactorId));
    } catch (err) {
      console.error('Decline failed:', err);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-8">Loading contacts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Pending Requests Column */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search contacts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending Requests ({pending.length})
              </h2>
              
              <div className="space-y-3">
                {pending.length === 0 ? (
                  <div className="text-gray-400 text-center py-6">
                    No pending requests
                  </div>
                ) : (
                  pending.map(request => (
                    <div 
                      key={request._id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 rounded-full p-2">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium block">{request.name}</span>
                          <span className="text-sm text-gray-500">
                            Requested {new Date(request.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(request._id)}
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDecline(request._id)}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Accepted Contacts Column */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-500" />
                Your Contacts ({filteredContacts.length})
              </h2>
              
              <div className="space-y-3">
                {filteredContacts.length === 0 ? (
                  <div className="text-gray-400 text-center py-6">
                    No contacts yet
                  </div>
                ) : (
                  filteredContacts.map(contact => (
                    <div 
                      key={contact._id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-green-100 rounded-full p-2">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-gray-800">{contact.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}