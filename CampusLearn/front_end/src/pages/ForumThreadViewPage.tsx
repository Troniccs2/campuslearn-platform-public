import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ForumPostCard from "../components/ForumPostCard";
import ForumPostDisplayCard from "../components/ForumPostDisplayCard";
import api from "../services/api";
import { FaArrowLeft } from "react-icons/fa";

// Interface for the Thread Header data (Adjust to match your Spring DTO)
interface ForumThread {
  id: number;
  title: string;
  authorName: string;
  lastUpdated: string;
}

// Interface for a single Post/Reply data (Adjust to match your Spring DTO)
interface ThreadPost {
  id: number;
  authorName: string;
  content: string;
  postedDate: string;
}

// Interface for the new reply payload (Adjust to match your Spring DTO)
interface ReplyPayload {
  threadSlug: string;
  content: string;
}

const ForumThreadViewPage: React.FC = () => {
  const { slug: categorySlug, threadSlug } = useParams<{
    slug: string;
    threadSlug: string;
  }>();
  const navigate = useNavigate();

  const [thread, setThread] = useState<ForumThread | null>(null);
  const [posts, setPosts] = useState<ThreadPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const threadTitle = threadSlug
    ? threadSlug.charAt(0).toUpperCase() +
      threadSlug.slice(1).replace(/-/g, " ")
    : "Forum Thread"; // Function to fetch both the thread header and the list of posts
  const fetchThreadData = useCallback(async () => {
    // ✅ FINAL CORRECT VALIDATION: Only check if parameters are present.
    if (!categorySlug || !threadSlug) {
      setIsLoading(false);
      setError(
        "Invalid URL parameters. Cannot load thread. Please ensure your URL is structured as /forums/category-slug/thread-slug."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const threadUrl = `/forums/${categorySlug}/${threadSlug}`; // 1. Fetch Thread Header Data
      const threadResponse = await api.get<ForumThread>(threadUrl);
      setThread(threadResponse.data); // 2. Fetch Posts/Replies Data // ✅ CORRECT URL FOR POSTS: This endpoint is now handled by the fixed Java controller.

      const postsUrl = `${threadUrl}/posts`;
      const postsResponse = await api.get<ThreadPost[]>(postsUrl);
      setPosts(postsResponse.data);
    } catch (err) {
      console.error("Failed to fetch thread data:", err);
      setError(
        "Could not load the thread. Ensure the backend is running and the URL is correct."
      );
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug, threadSlug]);

  useEffect(() => {
    fetchThreadData();
  }, [fetchThreadData]);

  // Function to handle reply submission and refresh the posts list
  const handlePostReply = async (content: string) => {
    if (!categorySlug || !threadSlug) return; // ✅ CORRECT POST URL: Note the URL matches the Java controller's @PostMapping("/.../reply")

    const url = `/forums/${categorySlug}/${threadSlug}/reply`;

    const payload: ReplyPayload = {
      threadSlug: threadSlug,
      content: content,
    };

    try {
      await api.post(url, payload); // Refresh the posts list to show the new reply

      await fetchThreadData();
    } catch (err) {
      console.error("Failed to post reply:", err);
      throw new Error(
        "Failed to submit reply. Please check network and backend."
      );
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
                        Loading thread and posts...            {" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 p-8 font-semibold">
                        {error}           {" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
                  <Header />           {" "}
      <main className="max-w-4xl mx-auto py-4 px-4 space-y-8 relative z-10">
                        {/* Back to Category Link */}               {" "}
        <div className="flex justify-start">
                                       {" "}
          <button
            onClick={() => navigate(`/forums/${categorySlug}`)}
            className="flex items-center gap-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-md text-white rounded-xl hover:bg-opacity-30 transition-all duration-300 shadow-lg font-medium border border-white border-opacity-30"
          >
                                    <FaArrowLeft className="w-4 h-4" />         
                          <span>&lt; Back to Category</span>                   {" "}
          </button>
                                   {" "}
        </div>
                        {/* Thread Title and Info */}               {" "}
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                              {thread?.title || threadTitle}               {" "}
        </h1>
                               {" "}
        <p className="text-lg text-gray-300 border-b border-purple-700 pb-4">
                              Started by:          {" "}
          <span className="font-medium">{thread?.authorName || "Unknown"}</span>
                              | Last Update: {thread?.lastUpdated || "N/A"}     
                   {" "}
        </p>
                        {/* Display Existing Posts/Chats */}               {" "}
        <section className="space-y-4 pt-4">
                                       {" "}
          <h2 className="text-3xl font-bold text-white">
                        Replies ({posts.length})          {" "}
          </h2>
                                       {" "}
          {posts.length > 0 ? (
            posts.map((post) => (
              <ForumPostDisplayCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center p-8 bg-purple-900 bg-opacity-30 rounded-xl">
                                                       {" "}
              <p className="text-gray-300 font-medium">
                                                No replies yet. Be the first to
                start the                 conversation!                        
                   {" "}
              </p>
                                                   {" "}
            </div>
          )}
                                   {" "}
        </section>
                                {/* Reply Section */}               {" "}
        <section className="pt-8">
                                       {" "}
          <h2 className="text-3xl font-bold text-white mb-4">Post a Reply</h2>
                              <ForumPostCard onSubmit={handlePostReply} />     
                   {" "}
        </section>
                           {" "}
      </main>
                  <Footer />       {" "}
    </div>
  );
};

export default ForumThreadViewPage;
