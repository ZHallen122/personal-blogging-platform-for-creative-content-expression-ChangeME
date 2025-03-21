import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TextEditor from "../components/TextEditor";

// Zod schema for blog form validation
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  coverImage: z.string().optional(),
  tags: z.string().optional(),
  content: z.string().min(1, "Content cannot be empty"),
});

type BlogFormData = z.infer<typeof blogSchema>;

// Modal overlay component for previewing the blog
interface PreviewModalProps {
  data: BlogFormData;
  onClose: () => void;
}
const PreviewModal: React.FC<PreviewModalProps> = ({ data, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg max-w-3xl w-11/12 p-6 overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold font-arial mb-4 text-[#2c3e50]">
            {data.title}
          </h2>
          {data.coverImage && (
            <img
              src={data.coverImage}
              alt="Cover"
              className="w-full h-auto rounded mb-4"
            />
          )}
          <div
            className="prose font-georgia text-[16px] text-[#2c3e50] mb-4"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          {data.tags && (
            <div className="mb-4">
              <span className="font-bold font-arial text-lg text-[#2c3e50]">
                Tags:{" "}
              </span>
              <span className="font-georgia text-[16px] text-[#2c3e50]">
                {data.tags}
              </span>
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-colors font-arial"
            >
              Close Preview
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Modal overlay component for publish confirmation
interface PublishConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isPublishing: boolean;
}
const PublishConfirmModal: React.FC<PublishConfirmModalProps> = ({
  onConfirm,
  onCancel,
  isPublishing,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg max-w-md w-11/12 p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold font-arial mb-4 text-[#2c3e50]">
            Confirm Publish
          </h3>
          <p className="font-georgia text-[16px] text-[#2c3e50] mb-6">
            Are you sure you want to publish this blog post?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white transition-colors font-arial"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPublishing}
              className={`px-4 py-2 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-colors font-arial ${
                isPublishing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPublishing ? "Publishing..." : "Confirm"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      coverImage: "",
      tags: "",
      content: "",
    },
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string>("");

  const formData = watch();

  // Function to simulate an API call to publish the blog post.
  const publishBlog = async (data: BlogFormData) => {
    try {
      setIsPublishing(true);
      // Simulated API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Published blog:", data);
      // On successful publish, navigate to home page (or blog detail page)
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
      setPublishError("Failed to publish blog. Please try again.");
    } finally {
      setIsPublishing(false);
      setShowPublishConfirm(false);
    }
  };

  const onSubmit = (data: BlogFormData) => {
    publishBlog(data);
  };

  return (
    <>
      <Header />
      <main className="pt-20 pb-24 bg-white min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar: Blog Settings */}
              <aside className="lg:col-span-1 space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-lg font-bold mb-2 font-arial text-[#2c3e50]"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    {...register("title")}
                    type="text"
                    placeholder="Enter blog title"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia text-[16px] text-[#2c3e50]"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="coverImage"
                    className="block text-lg font-bold mb-2 font-arial text-[#2c3e50]"
                  >
                    Cover Image URL
                  </label>
                  <input
                    id="coverImage"
                    {...register("coverImage")}
                    type="text"
                    placeholder="https://picsum.photos/500/300"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia text-[16px] text-[#2c3e50]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-lg font-bold mb-2 font-arial text-[#2c3e50]"
                  >
                    Tags
                  </label>
                  <input
                    id="tags"
                    {...register("tags")}
                    type="text"
                    placeholder="Comma-separated tags"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia text-[16px] text-[#2c3e50]"
                  />
                </div>
                {publishError && (
                  <p className="text-red-500 text-sm">{publishError}</p>
                )}
              </aside>

              {/* Main Content: Text Editor */}
              <section className="lg:col-span-3">
                <Controller
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <TextEditor value={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.message}
                  </p>
                )}
              </section>
            </div>
          </div>
          {/* Hidden submit button to allow form submission via handleSubmit */}
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed inset-x-0 bottom-0 bg-white shadow-inner p-4 flex justify-end space-x-4 z-40">
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className="px-4 py-2 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 font-arial"
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setShowPublishConfirm(true)}
          className="px-4 py-2 rounded bg-[#3498db] text-white hover:bg-[#e74c3c] transition-transform transform hover:scale-105 font-arial"
        >
          Publish
        </button>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal data={formData} onClose={() => setShowPreview(false)} />
        )}
      </AnimatePresence>

      {/* Publish Confirmation Modal */}
      <AnimatePresence>
        {showPublishConfirm && (
          <PublishConfirmModal
            isPublishing={isPublishing}
            onCancel={() => setShowPublishConfirm(false)}
            onConfirm={handleSubmit(onSubmit)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default CreateBlog;