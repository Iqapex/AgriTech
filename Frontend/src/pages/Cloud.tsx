import { useState, useRef } from 'react';
import { Folder, Clock, Image, Video, Upload, Cloud as CloudIcon, File, Film, Search } from 'lucide-react';

type FileType = 'pdf' | 'image' | 'video' | 'document';

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  url: string;
  createdAt: Date;
  file?: globalThis.File;
}

export default function Cloud() {
  const [activeTab, setActiveTab] = useState<'files' | 'recent' | 'photos' | 'videos'>('files');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'Golicit.pdf', type: 'pdf', url: '/files/golicit.pdf', createdAt: new Date('2024-03-01') },
    { id: '2', name: 'Let_the_world.png', type: 'image', url: '/files/world.png', createdAt: new Date('2024-03-05') },
    { id: '3', name: 'mcbr3264.dll', type: 'document', url: '/files/mcbr.dll', createdAt: new Date('2024-03-10') },
    { id: '4', name: 'Meetings.png', type: 'image', url: '/files/meetings.png', createdAt: new Date('2024-03-12') },
    { id: '5', name: 'Schedule.png', type: 'image', url: '/files/schedule.png', createdAt: new Date('2024-03-15') },
    { id: '6', name: 'testPosting.png', type: 'image', url: '/files/test.png', createdAt: new Date('2024-03-18') },
    { id: '7', name: 'Hakata Ram.mp4', type: 'video', url: '/files/hakata.mp4', createdAt: new Date('2024-03-20') },
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (!newFiles) return;

    const uploadedFiles: FileItem[] = Array.from(newFiles).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      type: getFileType(file.type),
      url: URL.createObjectURL(file),
      createdAt: new Date(),
      file: file
    }));

    setFiles(prev => [...uploadedFiles, ...prev]);
  };

  const getFileType = (mimeType: string): FileType => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'pdf';
    return 'document';
  };

  const getFilteredFiles = () => {
    let filtered = files;
    
    // Apply tab filter
    switch (activeTab) {
      case 'photos': filtered = filtered.filter(f => f.type === 'image'); break;
      case 'videos': filtered = filtered.filter(f => f.type === 'video'); break;
      case 'recent': filtered = [...filtered].sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5); break;
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )}
    
    return filtered;
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'pdf': return <File className="w-12 h-12 text-red-500" />;
      case 'image': return <Image className="w-12 h-12 text-blue-500" />;
      case 'video': return <Film className="w-12 h-12 text-purple-500" />;
      default: return <File className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Hrithik Ghanty</h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveTab('files')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'files' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 text-gray-600'
                  }`}
                >
                  <Folder className="w-5 h-5" />
                  <span>My Files</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('recent')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'recent' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 text-gray-600'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span>Recent</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('photos')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'photos' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 text-gray-600'
                  }`}
                >
                  <Image className="w-5 h-5" />
                  <span>Photos</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('videos')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeTab === 'videos' ? 'bg-blue-50 text-blue-600' : 'hover:bg-blue-50 text-gray-600'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>Videos</span>
                </button>
              </div>
              
              <div className="mt-8">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CloudIcon className="w-5 h-5 text-blue-600" />
                    <button className="text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition-colors">
                      Upgrade
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3.2 GB of 15GB used</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*, video/*, application/pdf"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload File</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getFilteredFiles().length === 0 ? (
                  <div className="col-span-full text-center text-gray-500 py-8">
                    No files found matching your criteria
                  </div>
                ) : (
                  getFilteredFiles().map((file) => (
                    <div 
                      key={file.id}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="aspect-square bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {file.createdAt.toLocaleDateString()}
                      </p>
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