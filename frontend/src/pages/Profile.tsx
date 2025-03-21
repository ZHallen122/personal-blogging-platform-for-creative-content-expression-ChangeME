import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserInfo from "@/components/UserInfo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema and TypeScript type for Settings form
const settingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
});
type SettingsFormValues = z.infer<typeof settingsSchema>;

const Profile: React.FC = () => {
  // Scroll to top on mount for proper page transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State to manage active profile tab
  const [activeTab, setActiveTab] = useState<"myBlogs" | "followers" | "settings">("myBlogs");

  // Mock data for blog posts
  const blogPosts = [
    {
      id: "1",
      title: "My First Blog",
      excerpt: "This is an excerpt of my first blog post. Discover the journey of creative expression and the stories behind every thought.",
      date: "2023-09-15",
      coverImageUrl: "https://picsum.photos/500/300?random=1",
    },
    {
      id: "2",
      title: "Exploring Creativity",
      excerpt: "Discovering the depths of creative expression through art, writing, and digital media. Every moment is a source of inspiration.",
      date: "2023-09-20",
      coverImageUrl: "https://picsum.photos/500/300?random=2",
    },
    {
      id: "3",
      title: "Inspiration Daily",
      excerpt: "A daily dose of inspiration and motivation to keep the creative fire burning. Share your ideas and join the community.",
      date: "2023-09-25",
      coverImageUrl: "https://picsum.photos/500/300?random=3",
    },
  ];

  // Mock data for followers list
  const followers = [
    { id: "f1", name: "Alice Smith", avatarUrl: "https://picsum.photos/50/50?random=4" },
    { id: "f2", name: "Bob Johnson", avatarUrl: "https://picsum.photos/50/50?random=5" },
    { id: "f3", name: "Charlie Brown", avatarUrl: "https://picsum.photos/50/50?random=6" },
  ];
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // React Hook Form for Profile Settings with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: "", email: "", bio: "" },
  });

  const onSubmit = (data: SettingsFormValues) => {
    console.log("Settings updated:", data);
    alert("Profile settings updated successfully!");
    // Optionally, update the form with the new data
    reset(data);
  };

  // Function to handle active tab changes
  const handleTabClick = (tab: "myBlogs" | "followers" | "settings") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#2c3e50]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-arial-sans mb-4 text-center">My Profile</h1>

        {/* User information section */}
        <UserInfo />

        {/* Tabs Navigation */}
        <div className="mt-8">
          <div className="flex justify-center border-b border-gray-300">
            <button
              onClick={() => handleTabClick("myBlogs")}
              className={`px-4 py-2 font-arial-sans text-base transition-colors ${
                activeTab === "myBlogs"
                  ? "border-b-2 border-[#3498db] text-[#3498db]"
                  : "border-b-2 border-transparent hover:text-[#3498db]"
              }`}
            >
              My Blogs
            </button>
            <button
              onClick={() => handleTabClick("followers")}
              className={`px-4 py-2 font-arial-sans text-base transition-colors ${
                activeTab === "followers"
                  ? "border-b-2 border-[#3498db] text-[#3498db]"
                  : "border-b-2 border-transparent hover:text-[#3498db]"
              }`}
            >
              Followers
            </button>
            <button
              onClick={() => handleTabClick("settings")}
              className={`px-4 py-2 font-arial-sans text-base transition-colors ${
                activeTab === "settings"
                  ? "border-b-2 border-[#3498db] text-[#3498db]"
                  : "border-b-2 border-transparent hover:text-[#3498db]"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "myBlogs" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader className="p-4">
                      <CardTitle className="text-xl font-arial-sans">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm font-georgia">{post.excerpt}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Published on {post.date}
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          type="button"
                          onClick={() => alert(`Viewing blog: ${post.title}`)}
                          className="bg-[#3498db] hover:bg-[#e74c3c] text-white rounded px-3 py-1 transition transform hover:scale-105"
                        >
                          View
                        </Button>
                        <Button
                          type="button"
                          onClick={() => alert(`Editing blog: ${post.title}`)}
                          className="bg-[#3498db] hover:bg-[#e74c3c] text-white rounded px-3 py-1 transition transform hover:scale-105"
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "followers" && (
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search followers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia text-base"
                  />
                </div>
                {filteredFollowers.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {filteredFollowers.map((follower) => (
                      <div
                        key={follower.id}
                        className="flex items-center p-4 bg-white shadow rounded"
                      >
                        <img
                          src={follower.avatarUrl}
                          alt={follower.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <span className="text-base font-arial-sans">{follower.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center font-georgia">No followers found.</p>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="max-w-lg mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-base font-arial-sans mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-base font-arial-sans mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-base font-arial-sans mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      {...register("bio")}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia"
                      rows={4}
                    />
                    {errors.bio && (
                      <p className="text-xs text-red-600 mt-1">{errors.bio.message}</p>
                    )}
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-[#3498db] hover:bg-[#e74c3c] text-white rounded px-6 py-2 transition transform hover:scale-105"
                    >
                      Update Settings
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;