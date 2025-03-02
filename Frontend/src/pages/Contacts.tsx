import { useState, useEffect } from 'react';
import { User, Search, Clock, Check, X } from 'lucide-react';

interface ContactRequest {
  id: string;
  name: string;
  timestamp: number;
}

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingContacts, setPendingContacts] = useState<ContactRequest[]>([]);
  const [acceptedContacts, setAcceptedContacts] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPending = localStorage.getItem('pendingContacts');
    const savedAccepted = localStorage.getItem('acceptedContacts');
    
    if (savedPending) setPendingContacts(JSON.parse(savedPending));
    if (savedAccepted) setAcceptedContacts(JSON.parse(savedAccepted));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pendingContacts', JSON.stringify(pendingContacts));
    localStorage.setItem('acceptedContacts', JSON.stringify(acceptedContacts));
  }, [pendingContacts, acceptedContacts]);

  const handleAccept = (request: ContactRequest) => {
    // Add to accepted and remove from pending
    setAcceptedContacts(prev => [...prev, request.name]);
    setPendingContacts(prev => prev.filter(item => item.id !== request.id));
  };

  const handleDecline = (requestId: string) => {
    // Remove from pending
    setPendingContacts(prev => prev.filter(item => item.id !== requestId));
  };

  const filteredAcceptedContacts = acceptedContacts.filter(name =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Pending Requests Column */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending Requests ({pendingContacts.length})
              </h2>
              
              <div className="space-y-3">
                {pendingContacts.length === 0 ? (
                  <div className="text-gray-400 text-center py-6">
                    No pending requests
                  </div>
                ) : (
                  pendingContacts.map((request) => (
                    <div 
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <User className="w-5 h-5 text-blue-600" />
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
                          onClick={() => handleAccept(request)}
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 transition-colors"
                          aria-label="Accept request"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDecline(request.id)}
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                          aria-label="Decline request"
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
                Your Contacts ({acceptedContacts.length})
              </h2>
              
              <div className="space-y-3">
                {filteredAcceptedContacts.length === 0 ? (
                  <div className="text-gray-400 text-center py-6">
                    No contacts yet
                  </div>
                ) : (
                  filteredAcceptedContacts.map((name, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-100 rounded-full p-2">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-800">{name}</span>
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