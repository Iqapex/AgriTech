import { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import type { Post, Profile } from '../types';
import CreatePostModal from '../components/CreatePostModal';

export default function Profile() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [profile] = useState<Profile>({
    id: '1',
    name: 'Hrithik SecondLawyer',
    role: 'Lawyer',
    location: 'Morvi, Gujarat, India',
    about: 'Just became a Lawyer!',
    rating: 5.0,
    cases: 17,
    experience: 30,
    education: [
      {
        school: 'IEM',
        degree: 'B. Tech',
        field: 'CSE',
        year: 'Jun 02, 2016 - present',
        grade: '9.0'
      }
    ]
  });

  const [posts] = useState<Post[]>([
    {
      id: '1',
      content: 'Caption',
      authorId: '1',
      authorName: 'Hrithik Ghanty',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      likes: 2,
      comments: 1
    },
    {
      id: '2',
      content: 'Ah',
      authorId: '1',
      authorName: 'Hrithik Ghanty',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      likes: 2,
      comments: 2
    }
  ]);

  const handleCreatePost = (content: string, image?: File) => {
    console.log('Creating post:', { content, image });
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl text-gray-600">{profile.name[0]}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
                  <p className="text-gray-600">{profile.role}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Added
                </span>
              </div>
              
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profile.location}</span>
              </div>

              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="ml-1 font-medium">{profile.rating}</span>
                <span className="text-gray-400 ml-1">(1)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{profile.cases}</div>
              <div className="text-sm text-gray-600">Cases</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{profile.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{profile.experience}</div>
              <div className="text-sm text-gray-600">Years</div>
            </div>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div
            onClick={() => setShowCreatePost(true)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">{profile.name[0]}</span>
            </div>
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-500">
              Hrithik, what's on your mind?
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">{post.authorName[0]}</span>
                  </div>
                  <div>
                    <div className="font-medium">{post.authorName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Delete post</span>
                  •••
                </button>
              </div>

              <p className="text-gray-800 mb-4">{post.content}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1">
                  <span>{post.likes}</span> likes
                </button>
                <button className="flex items-center gap-1">
                  View all {post.comments} comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onCreatePost={handleCreatePost}
          userName={profile.name}
        />
      )}
    </div>
  );
}