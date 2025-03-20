import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { ImageIcon, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

interface AppUser {
  _id: string;
  firstname: string;
  lastname: string;
  profilePic?: string;
  isLawyer?: boolean;
  accessToken?: string; // added for ease of use
  contacts?: string[];  // array of contact user IDs
}

interface Post {
  _id: string;
  userId: string;
  user: string;
  desc: string;
  img?: string;
  likes: string[]; // array of user IDs who liked
  comments: {
    userId: string;
    comment: string;
    createdAt: string;
  }[];
  createdAt: string;
}

export default function Feed() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [contacts, setContacts] = useState<AppUser[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ content: "", image: "" });
  const [newComment, setNewComment] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Fetch current user from token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.id;
        fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            // Save token along with user data for subsequent requests
            setCurrentUser({ ...data, _id: data._id, accessToken: token });
          })
          .catch((err) => console.error("Failed to fetch current user:", err));
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    } else {
      console.error("No auth token found");
    }
  }, []);

  // Fetch contacts from the current user's data
  useEffect(() => {
    if (currentUser) {
      const fetchContacts = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/users/${currentUser._id}`,
            {
              headers: { Authorization: `Bearer ${currentUser.accessToken}` },
            }
          );
          if (!res.ok) throw new Error("Failed to fetch user data");
          const userData = await res.json();
          if (!userData.contacts || userData.contacts.length === 0) {
            setContacts([]);
            return;
          }
          const acceptedContacts: AppUser[] = await Promise.all(
            userData.contacts.map(async (contactId: string) => {
              const res = await fetch(
                `http://localhost:5000/api/users/${contactId}`,
                {
                  headers: {
                    Authorization: `Bearer ${currentUser.accessToken}`,
                  },
                }
              );
              if (!res.ok)
                throw new Error(`Failed to fetch contact ${contactId}`);
              const data = await res.json();
              return {
                _id: contactId,
                firstname: data.firstname,
                lastname: data.lastname,
                profilePic: data.profilePic || "",
                isLawyer: data.isLawyer,
              };
            })
          );
          setContacts(acceptedContacts);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      };
      fetchContacts();
    }
  }, [currentUser]);

  // Fetch feed posts: current user's posts + contacts' posts
  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:5000/api/posts/feed/${currentUser._id}`)
        .then((res) => res.json())
        .then((data: Post[]) => setPosts(data))
        .catch((err) => console.error("Error fetching feed posts:", err));
    }
  }, [currentUser]);

  // Handle creating a new post
  const handlePost = () => {
    if (!newPost.content) return;
    const payload = {
      userId: currentUser?._id,
      user: currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : "",
      desc: newPost.content,
      img: newPost.image,
    };
    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((createdPost: Post) => {
        setPosts([createdPost, ...posts]);
        setNewPost({ content: "", image: "" });
      })
      .catch((err) => console.error("Error creating post:", err));
  };

  // Handle image upload (converting file to base64 for simplicity)
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

  // Handle liking a post
  const handleLike = (postId: string) => {
    fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser?._id }),
    })
      .then((res) => res.json())
      .then(() => {
        if (currentUser) {
          fetch(`http://localhost:5000/api/posts/feed/${currentUser._id}`)
            .then((res) => res.json())
            .then((data: Post[]) => setPosts(data));
        }
      })
      .catch((err) => console.error("Error liking post:", err));
  };

  // Handle commenting on a post
  const handleComment = (postId: string) => {
    if (!newComment.trim()) return;
    fetch(`http://localhost:5000/api/posts/addcomment/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser?._id, comment: newComment }),
    })
      .then((res) => res.json())
      .then(() => {
        if (currentUser) {
          fetch(`http://localhost:5000/api/posts/feed/${currentUser._id}`)
            .then((res) => res.json())
            .then((data: Post[]) => setPosts(data));
        }
        setNewComment("");
        setSelectedPostId(null);
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  // Handle sharing a post using the native share API
  const handleShare = async (post: Post) => {
    try {
      await navigator.share({
        title: `Post by ${post.user}`,
        text: post.desc,
        url: window.location.href,
      });
    } catch (err) {
      alert("Sharing failed: " + err);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen pt-24 bg-green-50 gap-8">
      {/* Left Sidebar - Profile Info */}
      <div className="w-80 bg-white shadow-sm p-6 rounded">
        {currentUser ? (
          <>
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={
                  currentUser.profilePic ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.firstname}+${currentUser.lastname}`
                }
                className="w-12 h-12 rounded-full border-2 border-green-500"
              />
              <div>
                <p className="font-bold text-gray-900">
                  {currentUser.firstname} {currentUser.lastname}
                </p>
                <p className="text-sm text-gray-500">Farmer Consultant</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                <h3 className="text-sm font-semibold text-green-800 mb-3">
                  Profile Strength
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 rounded-full h-2"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Recent Activity
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✏️</span>
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
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xs">💬</span>
                    </div>
                    <span>Commented on article</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Main Feed */}
      <div className="flex-1 max-w-2xl py-8">
        {/* New Post Section */}
        <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start gap-4">
            <img
              src={
                currentUser?.profilePic ||
                `https://api.dicebear.com/7.x/initials/svg?seed=You`
              }
              className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1 space-y-4">
              <textarea
                placeholder="What's new with you?"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="w-full px-4 py-3 border-0 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:bg-white placeholder-gray-500 resize-none"
                rows={3}
              />
              {newPost.image && (
                <img
                  src={newPost.image}
                  className="rounded-xl object-cover w-full aspect-video"
                />
              )}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-500 hover:text-green-600 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Media</span>
                </label>
                <button
                  onClick={handlePost}
                  className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-400 hover:to-green-700 text-white rounded-lg font-medium transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.map((post) => (
          <div
            key={post._id}
            className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
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
              <p className="text-gray-800 mb-5">{post.desc}</p>
              {post.img && (
                <img
                  src={post.img}
                  className="w-full aspect-video object-cover rounded-xl mb-5"
                />
              )}
              <div className="flex items-center gap-4 text-gray-500 pt-4 border-t border-gray-100">
                <button
                  className="flex items-center gap-2 hover:text-green-600 px-3 py-2 rounded-lg transition-colors"
                  onClick={() => handleLike(post._id)}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {post.likes.length}
                  </span>
                </button>
                <button
                  className="flex items-center gap-2 hover:text-green-600 px-3 py-2 rounded-lg transition-colors"
                  onClick={() =>
                    setSelectedPostId(
                      post._id === selectedPostId ? null : post._id
                    )
                  }
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {post.comments.length}
                  </span>
                </button>
                <button
                  className="hover:text-green-600 px-3 py-2 rounded-lg transition-colors"
                  onClick={() => handleShare(post)}
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              {selectedPostId === post._id && (
                <div className="pt-5 mt-5 border-t border-gray-100">
                  <div className="space-y-4 mb-5">
                    {post.comments.map((c, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-100 to-purple-100"></div>
                        <div className="flex-1 bg-gray-50 p-3 rounded-xl">
                          <p className="text-sm text-gray-800">{c.comment}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <button className="hover:text-green-600">Like</button>
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
                        className="w-full px-4 py-2.5 pr-20 bg-gray-50 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white border-0"
                      />
                      <button
                        onClick={() => handleComment(post._id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
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
      <div className="w-80 bg-white shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Contacts</h3>
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.firstname}+${contact.lastname}`}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-gray-900 font-medium">
                {contact.firstname} {contact.lastname}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
