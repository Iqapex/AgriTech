// src/components/Messages.tsx
import { useEffect, useState, useRef } from 'react';
import { Search, Plus, Send } from 'lucide-react';
import io, { Socket } from 'socket.io-client';
import { useApi } from '../hooks/useApi';

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

type OnlineUser = {
  userId: string;
  socketId: string;
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
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  // Refs
  const socket = useRef<typeof Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Use a ref to always have the latest selectedConversation for socket callbacks.
  const selectedConversationRef = useRef<string | null>(selectedConversation);
  const { fetchData } = useApi();

  // When selectedConversation changes, update its ref.
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // Socket connection (runs once when component mounts or when currentUser changes)
  useEffect(() => {
    socket.current = io('http://localhost:8900');

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket');
      if (currentUser) {
        socket.current?.emit('addUser', currentUser._id);
      }
    });

    // Listen for online users from the server
    socket.current.on('getUsers', (usersFromServer: OnlineUser[]) => {
      setOnlineUsers(usersFromServer);
    });

    // Listen for incoming messages
    socket.current.on('getMessage', (newMsg: Message) => {
      // Only update if the message belongs to the currently selected conversation.
      if (newMsg.conversationId === selectedConversationRef.current) {
        setMessages(prev => [...prev, newMsg]);
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [currentUser]);

  // When currentUser changes, fetch available users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchData('/users');
        // Exclude current user from the list
        const filteredUsers = data.filter((u: User) => u._id !== currentUser?._id);
        setAvailableUsers(filteredUsers);
      } catch (err) {
        console.error('Failed to fetch available users:', err);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, fetchData]);

  // Fetch conversations for the current user
  useEffect(() => {
    const fetchConversations = async () => {
      if (currentUser?._id) {
        try {
          const data = await fetchData(`/conversation/${currentUser._id}`);
          setConversations(data);
        } catch (error) {
          console.error('Failed to fetch conversations:', error);
        }
      }
    };
    fetchConversations();
  }, [currentUser, fetchData]);

  // Fetch messages for the selected conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        try {
          const data = await fetchData(`/message/${selectedConversation}`);
          setMessages(data);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };
    fetchMessages();
  }, [selectedConversation, fetchData]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper: When a contact is clicked, fetch (or create) the conversation between the current user and that contact.
  const handleSelectContact = async (user: User) => {
    if (!currentUser) return;
    try {
      const conversation = await fetchData(
        `/api/conversation/find/${currentUser._id}/${user._id}`
      );
      setSelectedConversation(conversation._id);
      // Optionally, update the conversation list here.
    } catch (err) {
      console.error('Failed to fetch or create conversation', err);
    }
  };

  // Send a message: save via API and then emit through the socket.
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    const messageData = {
      conversationId: selectedConversation,
      senderId: currentUser._id,
      text: newMessage,
    };

    try {
      // Save message to the database via API
      const savedMessage = await fetchData('/message', 'POST', messageData);
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage('');

      // Determine recipient IDs (all members in the conversation except the sender)
      const conversation = conversations.find(convo => convo._id === selectedConversation);
      const recieverIds = conversation
        ? conversation.members.filter(member => member !== currentUser._id)
        : [];

      // Emit the message via WebSocket
      socket.current?.emit('sendMessage', {
        senderId: currentUser._id,
        recieverIds,
        conversationId: selectedConversation,
        text: newMessage,
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
          {/* For testing purposes, you might have a login or user selection screen.
              Here we assume the user is chosen and then stored in currentUser.
              If not, you could fetch the logged-in user from your auth context. */}
          <select
            onChange={(e) =>
              setCurrentUser({ _id: e.target.value, username: `User ${e.target.value}` })
            }
            className="p-2 rounded-lg border"
          >
            <option value="">Select User</option>
            {/* Option values can be fetched from the backend too */}
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4">
            {/* Left Sidebar */}
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

              {/* Contacts Section */}
              <div className="mb-4">
                <h2 className="text-lg font-bold">Contacts</h2>
                <div className="space-y-2">
                  {availableUsers.map((user) => {
                    const isOnline = onlineUsers.some(
                      (onlineUser) => onlineUser.userId === user._id
                    );
                    return (
                      <div
                        key={user._id}
                        onClick={() => handleSelectContact(user)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                        />
                        <span>{user.username}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Conversations Section */}
              <div>
                <h2 className="text-lg font-bold">Conversations</h2>
                <div className="space-y-1">
                  {conversations.map((convo) => (
                    <button
                      key={convo._id}
                      onClick={() => setSelectedConversation(convo._id)}
                      className={`w-full text-left p-3 rounded-lg ${
                        selectedConversation === convo._id
                          ? 'bg-green-50 text-green-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {convo.name ||
                        convo.members
                          .filter((member) => member !== currentUser?._id)
                          .join(', ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-3 h-[calc(100vh-8rem)] flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`flex ${
                          message.senderId === currentUser?._id ? 'justify-end' : 'justify-start'
                        }`}
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
                              {
                                availableUsers.find((u) => u._id === message.senderId)
                                  ?.username
                              }
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
