import { useState } from 'react';
import { Search, Plus, Send } from 'lucide-react';
import type { Message, ChatGroup } from '../types';
import CreateGroupModal from '../components/CreateGroupModal';

export default function Messages() {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [messages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi back',
      senderId: 'me',
      senderName: 'Me',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      content: 'Hiii ffom rtk',
      senderId: 'me',
      senderName: 'Me',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      content: 'Hi from rtk',
      senderId: 'me',
      senderName: 'Me',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      content: 'Hi rtk',
      senderId: 'soumya',
      senderName: 'Soumya Sen',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      content: 'Hey Everyone!',
      senderId: 'samya',
      senderName: 'Samya Banerjee',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '6',
      content: 'hi',
      senderId: 'me',
      senderName: 'Me',
      timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [groups] = useState<ChatGroup[]>([
    { id: 'new', name: 'New Group!', members: [] },
    { id: 'lawyer2', name: 'Hrithik SecondLawyer', members: ['me', 'lawyer2'] },
    { id: 'group2', name: 'Group 2', members: ['me', 'lawyer1', 'lawyer2'] },
    { id: 'lawyer1', name: 'Hrithik Lawyer', members: ['me', 'lawyer1'] },
    { id: 'group1', name: 'Group 1', members: ['me', 'lawyer1', 'lawyer2', 'samya'] },
    { id: 'samya', name: 'Samya Banerjee', members: ['me', 'samya'] }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleCreateGroup = (name: string, members: string[]) => {
    console.log('Creating group:', { name, members });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4">
            {/* Sidebar */}
            <div className="col-span-1 border-r border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search to start a chat"
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={() => setShowCreateGroup(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedGroup === group.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-3 h-[calc(100vh-8rem)] flex flex-col">
              {selectedGroup ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderId === 'me'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.senderId !== 'me' && (
                            <p className="text-xs font-medium mb-1">{message.senderName}</p>
                          )}
                          <p>{message.content}</p>
                          <p className="text-xs opacity-75 mt-1">
                            {message.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write something..."
                        className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Tap on a Conversation to see the Messages
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateGroup && (
        <CreateGroupModal
          onClose={() => setShowCreateGroup(false)}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
}