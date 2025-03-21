import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogPostPreview, { BlogPost } from "../components/BlogPostPreview";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for newsletter subscription form using Zod
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Home: React.FC = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for blog posts and loading/error handling
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Simulate an API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mocked blog posts data
        const mockedBlogs: BlogPost[] = [
          {
            id: "1",
            title: "Exploring the Beauty of Nature",
            excerpt: "Discover the wonders that nature has to offer and learn how to reconnect with the world around you.",
            publishDate: new Date().toISOString(),
            imageUrl: "https://picsum.photos/500/300?random=1",
            author: { id: "a1", name: "Alice" },
          },
          {
            id: "2",
            title: "The Art of Cooking",
            excerpt: "Join us as we dive into culinary arts and explore recipes that bring joy to your taste buds.",
            publishDate: new Date().toISOString(),
            imageUrl: "https://picsum.photos/500/300?random=2",
            author: { id: "a2", name: "Bob" },
          },
          {
            id: "3",
            title: "Travel Adventures",
            excerpt: "Pack your bags and get ready for an adventure that will take you to breathtaking destinations.",
            publishDate: new Date().toISOString(),
            imageUrl: "https://picsum.photos/500/300?random=3",
            author: { id: "a3", name: "Charlie" },
          },
          {
            id: "4",
            title: "Mindfulness and Meditation",
            excerpt: "Explore techniques that enhance mental clarity and bring balance to your day-to-day life.",
            publishDate: new Date().toISOString(),
            imageUrl: "https://picsum.photos/500/300?random=4",
            author: { id: "a4", name: "Diana" },
          },
          {
            id: "5",
            title: "Digital Photography Tips",
            excerpt: "Master the art of capturing moments and create stunning images with your camera.",
            publishDate: new Date().toISOString(),
            imageUrl: "https://picsum.photos/500/300?random=5",
            author: { id: "a5", name: "Edward" },
          },
          {
            id: "6",
            title: "Fitness and Wellness",
            excerpt: "Dedicate yourself to a healthier lifestyle with expert advice on fitness and wellbeing.",
            publishDate: new Date().toISOString(),
            imageUrl: "https://picsum.photos/500/300?random=6",
            author: { id: "a6", name: "Fiona" },
          },
        ];
        setBlogs(mockedBlogs);
      } catch (err) {
        setError("Failed to fetch blog posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Newsletter subscription form using React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    mode: "onBlur",
  });

  const onNewsletterSubmit = async (data: NewsletterForm) => {
    try {
      // Simulate an API call for newsletter subscription
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In a real implementation, you would send data.email to your backend
      reset();
    } catch (err) {
      // Error handling for newsletter subscription can be added here
      console.error("Newsletter subscription error:", err);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-[#f0f9ff]">
          <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-arial text-4xl md:text-6xl text-[#2c3e50] mb-4">
                Unleash Your Creativity
              </h1>
              <p className="font-georgia-serif text-lg text-[#2c3e50] mb-6">
                Join Creative Bloom and share your unique stories with a vibrant community.
              </p>
              <Link
                to="/create"
                className="inline-block px-6 py-3 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-colors font-arial"
              >
                Create Your Blog
              </Link>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <img
                src="https://picsum.photos/600/400"
                alt="Creative Illustration"
                className="w-full h-auto rounded shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Featured Blog Posts Section */}
        <section className="py-16 bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-arial text-2xl md:text-4xl text-[#2c3e50] mb-8 text-center">
              Featured Posts
            </h2>
            {loading && (
              <div className="text-center">
                <p className="font-georgia-serif text-base text-gray-600">Loading posts...</p>
              </div>
            )}
            {error && (
              <div className="text-center">
                <p className="font-georgia-serif text-base text-red-500">{error}</p>
              </div>
            )}
            {!loading && !error && blogs.length === 0 && (
              <div className="text-center">
                <p className="font-georgia-serif text-base text-gray-600">
                  No posts available.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogPostPreview key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-arial text-2xl md:text-4xl text-[#2c3e50] mb-4 text-center">
              Subscribe to our Newsletter
            </h2>
            <p className="font-georgia-serif text-base text-[#2c3e50] mb-8 text-center">
              Stay updated with the latest blog posts and creative tips.
            </p>
            {isSubmitSuccessful ? (
              <div className="text-center">
                <p className="font-georgia-serif text-lg text-[#2ecc71]">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onNewsletterSubmit)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-full">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3498db] transition"
                  />
                  {errors.email && (
                    <p className="font-georgia-serif text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-colors font-arial"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;