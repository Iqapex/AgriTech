import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User as UserIcon, Check, X, Clock } from 'lucide-react';

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
  const { userId } = useParams();
  const [pending, setPending] = useState<PendingContact[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('User ID not provided');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log(token);
        // Get current user data using userId from params
        const userRes = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const user = await userRes.json();

        // Fetch pending contacts details
        const pendingRequests = await Promise.all(
          user.pendingContacts.map(async (pc: any) => {
            const res = await fetch(`http://localhost:5000/api/users/${pc.contactorId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
            if (!res.ok) throw new Error('Failed to fetch contact details');
            const data = await res.json();
            return { 
              _id: pc.contactorId,
              name: `${data.firstname} ${data.lastname}`,
              timestamp: pc.timestamp || Date.now()
            };
          })
        );

        // Fetch accepted contacts
        const acceptedContacts = await Promise.all(
          user.contacts.map(async (id: string) => {
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
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
      } catch (err: any) {
        setError(err.message || 'Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleAccept = async (contactorId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`http://localhost:5000/api/users/${contactorId}/acceptConnect`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });
      
      if (!res.ok) throw new Error('Failed to accept request');
      
      setPending(prev => prev.filter(p => p._id !== contactorId));
      const acceptedContact = pending.find(p => p._id === contactorId);
      if (acceptedContact) {
        setContacts(prev => [...prev, { _id: contactorId, name: acceptedContact.name }]);
      }
    } catch (err) {
      console.error('Accept failed:', err);
    }
  };

  const handleDecline = async (contactorId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`http://localhost:5000/api/users/${contactorId}/declineConnect`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}` 
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
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                          <UserIcon className="w-5 h-5 text-green-600" />
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
                <UserIcon className="w-5 h-5 text-green-500" />
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
                        <UserIcon className="w-5 h-5 text-green-600" />
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
