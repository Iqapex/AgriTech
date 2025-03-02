import { useState } from "react";
import { ImageIcon, ThumbsUp, MessageCircle, Share2 } from "lucide-react";


interface Post {
  id: number;
  user: string;
  content: string;
  image?: string;
  likes: number;
  comments: string[];
}

interface Contact {
  id: number;
  name: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Jim Morgan",
      content: "Outside Supreme Court of the United States of America in Washington D.C.",
      image: "https://picsum.photos/600/400?random=1",
      likes: 566,
      comments: ["Amazing place!", "I visited last year, loved it."]
    },
    {
      id: 2,
      user: "Rashmita Singh",
      content: "Finally a lawyer",
      image: "https://picsum.photos/600/400?random=2",
      likes: 302,
      comments: ["Congratulations!", "Well deserved!"]
    }
  ]);

  const [newPost, setNewPost] = useState({ content: "", image: "" });
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [contacts] = useState<Contact[]>([
    { id: 1, name: "Alice Smith" },
    { id: 2, name: "Bob Johnson" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Miller" },
    { id: 5, name: "Evan Wright" },
  ]);

  const handlePost = () => {
    if (newPost.content) {
      setPosts([
        {
          id: Date.now(),
          user: "John Doe",
          content: newPost.content,
          image: newPost.image,
          likes: 0,
          comments: []
        },
        ...posts
      ]);
      setNewPost({ content: "", image: "" });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPost({ ...newPost, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId: number) => {
    if (newComment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      ));
      setNewComment("");
      setSelectedPostId(null);
    }
  };

  const handleShare = async (post: Post) => {
    try {
      await navigator.share({
        title: `Post by ${post.user}`,
        text: post.content,
        url: window.location.href
      });
    } catch (err) {
      alert("Sharing failed: " + err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 gap-8">
  {/* Left Sidebar - Profile Info */}
  <div className="w-80 bg-white shadow-sm p-6 h-auto top-0 rounded">
    <div className="flex items-center space-x-4 mb-8">
      <img 
        src="https://api.dicebear.com/7.x/initials/svg?seed=John+Doe" 
        className="w-12 h-12 rounded-full border-2 border-blue-500 p-0.5"
      />
      <div>
        <p className="font-bold text-gray-900">John Doe</p>
        <p className="text-sm text-gray-500">Legal Consultant</p>
      </div>
    </div>
    
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <h3 className="text-sm font-semibold text-blue-800 mb-3">Profile Strength</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full h-2 w-3/4"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs">✏️</span>
            </div>
            <span>Posted an update</span>
          </li>
          <li className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xs">👍</span>
            </div>
            <span>Liked a post</span>
          </li>
          <li className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xs">💬</span>
            </div>
            <span>Commented on article</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

  {/* Main Feed */}
  <div className="flex-1 max-w-2xl py-8">
    {/* New Post Section */}
    <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <img 
            src="https://api.dicebear.com/7.x/initials/svg?seed=John+Doe" 
            className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
          />
          <div className="flex-1 space-y-4">
            <textarea
              placeholder="What's new with you?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-4 py-3 border-0 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500 resize-none"
              rows={3}
            />
            {newPost.image && (
              <img src={newPost.image} className="rounded-xl object-cover w-full aspect-video" />
            )}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-500 hover:text-blue-600 cursor-pointer">
                <input type="file" className="hidden" onChange={handleImageUpload} />
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Media</span>
              </label>
              <button 
                onClick={handlePost}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Posts Feed */}
    {posts.map((post) => (
      <div key={post.id} className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-5">
          <div className="flex items-start gap-4 mb-5">
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.user}`} 
              className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
            />
            <div>
              <p className="font-semibold text-gray-900">{post.user}</p>
              <p className="text-sm text-gray-500">1h ago • 🌍 Public</p>
            </div>
          </div>
          
          <p className="text-gray-800 mb-5">{post.content}</p>
          {post.image && (
            <img 
              src={post.image} 
              className="w-full aspect-video object-cover rounded-xl mb-5"
            />
          )}
          
          <div className="flex items-center gap-4 text-gray-500 pt-4 border-t border-gray-100">
            <button 
              className="flex items-center gap-2 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
              onClick={() => handleLike(post.id)}
            >
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button
              className="flex items-center gap-2 hover:text-green-600 px-3 py-2 rounded-lg transition-colors"
              onClick={() => setSelectedPostId(post.id === selectedPostId ? null : post.id)}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
            <button 
              className="hover:text-purple-600 px-3 py-2 rounded-lg transition-colors"
              onClick={() => handleShare(post)}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {selectedPostId === post.id && (
            <div className="pt-5 mt-5 border-t border-gray-100">
              <div className="space-y-4 mb-5">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-purple-100"></div>
                    <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                      <p className="text-sm text-gray-800">{comment}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <button className="hover:text-blue-600">Like</button>
                        <span>•</span>
                        <span>1h ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/initials/svg?seed=You" 
                  className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                />
                <div className="flex-1 relative">
                  <input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2.5 pr-20 bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white border-0"
                  />
                  <button 
                    onClick={() => handleComment(post.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Right Sidebar - Contacts */}
  <div className="w-80 bg-white shadow-sm p-6 h-auto">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Contacts</h3>
    <div className="space-y-3">
      {contacts.map((contact) => (
        <div 
          key={contact.id} 
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`} 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-gray-900 font-medium">{contact.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}