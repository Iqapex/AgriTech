// src/components/Messages.tsx
import { useEffect, useState, useRef } from 'react';
import { Search, Plus, Send } from 'lucide-react';
import  io  from 'socket.io-client';
import {useApi} from '../hooks/useApi';
import { Socket } from 'socket.io-client';

// Types
type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

type Conversation = {
  _id: string;
  members: string[];
  name: string;
};

type User = {
  _id: string;
  username: string;
};

const Messages = () => {
  // State
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  
  // Refs
  const socket = useRef< Socket >();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { fetchData } = useApi();

  // Mock users (replace with actual API call)
  const mockUsers: User[] = [
    { _id: '1', username: 'User 1' },
    { _id: '2', username: 'User 2' },
    { _id: '3', username: 'User 3' },
  ];

  // Connect to WebSocket
  useEffect(() => {
    Socket.current = io('http://localhost:8900');

    Socket.current.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    Socket.current.on('receiveMessage', (newMessage: Message) => {
      if (newMessage.conversationId === selectedConversation) {
        setMessages(prev => [...prev, newMessage]);
      }
    });

    return () => {
      Socket.current?.disconnect();
    };
  }, []);

  // Fetch conversations when user changes
  useEffect(() => {
    const fetchConversations = async () => {
      if (currentUser?._id) {
        const data = await fetchData(`/api/conversation/${currentUser._id}`);
        setConversations(data);
      }
    };
    fetchConversations();
  }, [currentUser]);

  // Fetch messages when conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        const data = await fetchData(`/api/message/${selectedConversation}`);
        setMessages(data);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    const messageData = {
      conversationId: selectedConversation,
      senderId: currentUser._id,
      text: newMessage
    };

    try {
      // Send message via API
      const savedMessage = await fetchData('/api/message', 'POST', messageData);
      
      // Update local state
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage('');
      
      // Send via WebSocket
      socket.current?.emit('sendMessage', {
        senderId: currentUser._id,
        conversationId: selectedConversation,
        text: newMessage
      });
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* User Selection */}
        <div className="mb-4">
          <select 
            onChange={(e) => setCurrentUser(mockUsers.find(u => u._id === e.target.value) || null)}
            className="p-2 rounded-lg border"
          >
            <option value="">Select User</option>
            {mockUsers.map(user => (
              <option key={user._id} value={user._id}>{user.username}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4">
            {/* Conversations Sidebar */}
            <div className="col-span-1 border-r border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search chats"
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  onClick={() => setShowCreateGroup(true)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {conversations.map(convo => (
                  <button
                    key={convo._id}
                    onClick={() => setSelectedConversation(convo._id)}
                    className={`w-full text-left p-3 rounded-lg ${
                      selectedConversation === convo._id
                        ? 'bg-green-50 text-green-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {convo.name || convo.members
                      .filter(member => member !== currentUser?._id)
                      .join(', ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-3 h-[calc(100vh-8rem)] flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map(message => (
                      <div
                        key={message._id}
                        className={`flex ${message.senderId === currentUser?._id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === currentUser?._id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.senderId !== currentUser?._id && (
                            <p className="text-xs font-medium mb-1">
                              {mockUsers.find(u => u._id === message.senderId)?.username}
                            </p>
                          )}
                          <p>{message.text}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {new Date(message.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message"
                        className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;