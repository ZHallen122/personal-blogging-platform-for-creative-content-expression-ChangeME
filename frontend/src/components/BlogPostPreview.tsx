import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  imageUrl?: string;
  author?: {
    id: string;
    name: string;
  };
}

interface BlogPostPreviewProps {
  blog: BlogPost;
}

const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ blog }) => {
  // Fallback to a placeholder image if no image URL is provided
  const imageSrc = blog.imageUrl || `https://picsum.photos/500/300?random=${blog.id}`;

  return (
    <Link to={`/blog/${blog.id}`} className="block group">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="transition-transform duration-300"
      >
        <Card className="bg-white shadow rounded-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
          <img
            src={imageSrc}
            alt={blog.title}
            className="w-full h-48 md:h-56 object-cover"
          />
          <CardHeader className="p-4">
            <CardTitle className="font-arial-sans text-xl text-[#2c3e50]">
              {blog.title}
            </CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(blog.publishDate).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <CardDescription className="font-georgia-serif text-base text-[#2c3e50]">
              {blog.excerpt}
            </CardDescription>
          </CardContent>
          <CardFooter className="px-4 py-2 flex items-center justify-between">
            {blog.author && (
              <span className="text-sm font-georgia-serif text-gray-600">
                By {blog.author.name}
              </span>
            )}
            <ArrowRight className="w-5 h-5 text-[#3498db]" />
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default BlogPostPreview;