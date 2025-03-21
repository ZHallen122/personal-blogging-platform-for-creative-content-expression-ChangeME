import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentSection from "../components/CommentSection";
import { Facebook, Twitter, Share2 } from "lucide-react";

interface TableOfContentsItem {
  id: string;
  title: string;
}

interface RelatedPost {
  id: string;
  title: string;
  imageUrl: string;
}

interface PostData {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
  tableOfContents: TableOfContentsItem[];
  relatedPosts: RelatedPost[];
}

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Simulate an API call to fetch post data using the id parameter
    const fetchPost = () => {
      // Mock post data
      const mockPost: PostData = {
        id: id || "1",
        title: "The Art of Creative Expression",
        author: "Jane Doe",
        date: new Date().toISOString(),
        imageUrl: "https://picsum.photos/1200/400",
        content: `
          <h2 id="introduction" class="font-arial text-2xl text-[#2c3e50]">Introduction</h2>
          <p class="font-georgia-serif text-base text-[#2c3e50]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <h2 id="body" class="font-arial text-2xl text-[#2c3e50] mt-4">Main Content</h2>
          <p class="font-georgia-serif text-base text-[#2c3e50]">
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <h2 id="conclusion" class="font-arial text-2xl text-[#2c3e50] mt-4">Conclusion</h2>
          <p class="font-georgia-serif text-base text-[#2c3e50]">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        `,
        tableOfContents: [
          { id: "introduction", title: "Introduction" },
          { id: "body", title: "Main Content" },
          { id: "conclusion", title: "Conclusion" },
        ],
        relatedPosts: [
          {
            id: "2",
            title: "Exploring Creative Minds",
            imageUrl: "https://picsum.photos/100/100",
          },
          {
            id: "3",
            title: "The Journey of Art",
            imageUrl: "https://picsum.photos/101/101",
          },
        ],
      };

      // Simulate delay and set data
      setTimeout(() => {
        setPost(mockPost);
        setLoading(false);
      }, 1000);
    };

    try {
      fetchPost();
    } catch (err) {
      setError("Failed to load the blog post.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      {post && (
        <div className="bg-white">
          {/* Header Image with Overlay */}
          <div className="relative">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
              <h1 className="text-3xl md:text-5xl font-arial text-white">
                {post.title}
              </h1>
              <div className="mt-2 text-lg font-arial text-white">
                By {post.author} on {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Main Content & Sidebar */}
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row">
            <main role="main" className="flex-1 lg:mr-8">
              <article>
                <div
                  className="prose max-w-full"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </article>

              {/* Social Sharing Buttons */}
              <div className="flex space-x-4 mt-8">
                <button
                  aria-label="Share on Twitter"
                  className="p-2 bg-[#3498db] hover:bg-[#e74c3c] transition-colors rounded-full"
                >
                  <Twitter size={24} color="#ffffff" />
                </button>
                <button
                  aria-label="Share on Facebook"
                  className="p-2 bg-[#3498db] hover:bg-[#e74c3c] transition-colors rounded-full"
                >
                  <Facebook size={24} color="#ffffff" />
                </button>
                <button
                  aria-label="Share post"
                  className="p-2 bg-[#3498db] hover:bg-[#e74c3c] transition-colors rounded-full"
                >
                  <Share2 size={24} color="#ffffff" />
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-10">
                <CommentSection />
              </div>
            </main>
            <aside className="lg:w-1/3 mt-8 lg:mt-0">
              {/* Table of Contents */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <h2 className="text-xl font-arial text-[#2c3e50] mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-base text-[#3498db] hover:underline"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Author Info */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <h2 className="text-xl font-arial text-[#2c3e50] mb-4">
                  About the Author
                </h2>
                <div className="flex items-center">
                  <img
                    src="https://picsum.photos/100/100"
                    alt={post.author}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-arial text-lg">{post.author}</p>
                    <p className="font-georgia-serif text-sm text-gray-500">
                      Passionate writer and creative thinker.
                    </p>
                  </div>
                </div>
              </div>
              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-arial text-[#2c3e50] mb-4">
                  Related Posts
                </h2>
                <ul className="space-y-4">
                  {post.relatedPosts.map((related) => (
                    <li key={related.id} className="flex items-center">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="w-16 h-16 rounded object-cover mr-4"
                      />
                      <a
                        href={`/post/${related.id}`}
                        className="text-base text-[#3498db] hover:underline"
                      >
                        {related.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Post;