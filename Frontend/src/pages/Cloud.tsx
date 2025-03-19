import { useState, useRef, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { 
  Folder, Clock, Image, Video, Upload, Cloud as CloudIcon, 
  File, Search, Trash 
} from 'lucide-react';

type FileType = 'pdf' | 'image' | 'video' | 'document';

interface FileItem {
  id: string;
  fileName: string;
  url: string;
  type: FileType;
  createdAt: Date;
}

interface CurrentUser {
  id: string;
  accessToken: string;
  firstname?: string;
  lastname?: string;
  // add any other fields as needed
}

export default function Cloud() {
  const [activeTab, setActiveTab] = useState<'files' | 'recent' | 'photos' | 'videos'>('files');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // On mount, retrieve token and fetch current user
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const userIdFromToken = decoded.id || decoded._id;
        if (!userIdFromToken) {
          console.error('User ID not found in token');
          return;
        }
        fetch(`http://localhost:5000/api/users/${userIdFromToken}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) {
              console.error('Failed to fetch user, status:', res.status);
              throw new Error(`Failed to fetch user, status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log('Fetched user data:', data);
            // Map _id to id so that currentUser.id is defined
            setCurrentUser({ ...data, id: data._id, accessToken: token });
          })
          .catch((err) => console.error('Failed to fetch current user:', err));
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    } else {
      console.error('No auth token found');
    }
  }, []);
  
  // Extract userId and authToken from currentUser
  const userId = currentUser?.id;
  const authToken = currentUser?.accessToken;
  console.log('User ID:', userId);
  console.log('Auth Token:', authToken);
  
  // Fetch files when userId and authToken are available
  useEffect(() => {
    if (!userId || !authToken) return;
    const fetchFiles = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/files/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ userId }),
        });
        if (res.ok) {
          const data: FileItem[] = await res.json();
          console.log('Fetched files:', data);
          setFiles(data);
        } else {
          console.error('Failed to fetch files, status:', res.status);
        }
      } catch (err) {
        console.error('Error fetching files:', err);
      }
    };
    fetchFiles();
  }, [userId, authToken]);

  // Handle file uploads with debugging logs
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userId || !authToken) {
      console.error('User not authenticated');
      return;
    }
    const newFiles = e.target.files;
    if (!newFiles) return;
    console.log('Files selected for upload:', newFiles);
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      try {
        const res = await fetch('http://localhost:5000/api/files/fileUpload', {
          method: 'POST',
          headers: {
            // Let the browser set Content-Type for FormData
            'Authorization': `Bearer ${authToken}`,
          },
          body: formData,
        });
        if (res.ok) {
          const uploadedFile: FileItem = await res.json();
          console.log('Uploaded file:', uploadedFile);
          setFiles(prev => [uploadedFile, ...prev]);
        } else {
          console.error('Upload failed, status:', res.status);
          const errorText = await res.text();
          console.error('Upload error response:', errorText);
        }
      } catch (err) {
        console.error('Error during file upload:', err);
      }
    }
  };
  
  // Delete a file (permanent deletion) with debugging logs
  const deleteFile = async (fileId: string) => {
    if (!userId || !authToken) {
      console.error('User not authenticated');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/files/permanentDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ fileId, userId }),
      });
      if (res.ok) {
        console.log('File deleted:', fileId);
        setFiles(prev => prev.filter(f => f.id !== fileId));
      } else {
        console.error('Delete failed, status:', res.status);
        const errorText = await res.text();
        console.error('Delete error response:', errorText);
      }
    } catch (err) {
      console.error('Error during file deletion:', err);
    }
  };

  // Derive a thumbnail URL for videos using a Cloudinary transformation
  const getVideoThumbnailUrl = (url: string) => {
    const modified = url.replace('/video/upload/', '/video/upload/w_200,h_200,c_fill/');
    return modified.replace(/\.[a-z]+$/, '.jpg');
  };

  // Render a thumbnail instead of a generic file icon
  const getThumbnail = (file: FileItem) => {
    if (file.url && file.type === 'image') {
      return (
        <img
          src={file.url}
          alt={file.fileName}
          className="object-cover w-full h-full"
        />
      );
    } else if (file.url && file.type === 'video') {
      const videoThumb = getVideoThumbnailUrl(file.url);
      return (
        <img
          src={videoThumb}
          alt={file.fileName}
          className="object-cover w-full h-full"
        />
      );
    } else {
      return <File className="w-12 h-12 text-gray-500" />;
    }
  };

  // Filter files based on the active tab and search query
  const getFilteredFiles = () => {
    let filtered = files;
    switch (activeTab) {
      case 'photos':
        filtered = filtered.filter(f => f.type === 'image');
        break;
      case 'videos':
        filtered = filtered.filter(f => f.type === 'video');
        break;
      case 'recent':
        filtered = [...filtered]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        break;
      default:
        break;
    }
    if (searchQuery) {
      filtered = filtered.filter(file =>
        file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {currentUser ? `${currentUser.firstname || 'User'} ${currentUser.lastname || ''}` : 'Loading...'}
              </h2>
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveTab('files')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'files' ? 'bg-green-50 text-green-600' : 'hover:bg-green-50 text-gray-600'}`}
                >
                  <Folder className="w-5 h-5" />
                  <span>My Files</span>
                </button>
                <button 
                  onClick={() => setActiveTab('recent')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'recent' ? 'bg-green-50 text-green-600' : 'hover:bg-green-50 text-gray-600'}`}
                >
                  <Clock className="w-5 h-5" />
                  <span>Recent</span>
                </button>
                <button 
                  onClick={() => setActiveTab('photos')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'photos' ? 'bg-green-50 text-green-600' : 'hover:bg-green-50 text-gray-600'}`}
                >
                  <Image className="w-5 h-5" />
                  <span>Photos</span>
                </button>
                <button 
                  onClick={() => setActiveTab('videos')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeTab === 'videos' ? 'bg-green-50 text-green-600' : 'hover:bg-green-50 text-gray-600'}`}
                >
                  <Video className="w-5 h-5" />
                  <span>Videos</span>
                </button>
              </div>
              <div className="mt-8">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CloudIcon className="w-5 h-5 text-green-600" />
                    <button className="text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition-colors">
                      Upgrade
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
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
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
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
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors whitespace-nowrap"
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
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow relative cursor-pointer"
                    >
                      <div className="relative">
                        <div className="aspect-square bg-gray-200 rounded-lg mb-2 overflow-hidden">
                          {getThumbnail(file)}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{file.fileName}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(file.createdAt).toLocaleDateString()}
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
