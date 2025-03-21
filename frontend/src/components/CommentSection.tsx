import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MessageSquare, Send, ArrowRightCircle } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

// Mock data to simulate fetched comments
const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Alice',
    content: 'This is a wonderful blog post! Keep up the great work.',
    createdAt: new Date().toISOString(),
    replies: [
      {
        id: '2',
        author: 'Bob',
        content: 'I agree, very insightful!',
        createdAt: new Date().toISOString(),
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: 'Charlie',
    content: 'I learned a lot from this, thank you for sharing.',
    createdAt: new Date().toISOString(),
    replies: [],
  },
];

// Simulated API call to fetch comments
const fetchComments = (): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockComments);
    }, 1000);
  });
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // This state is used to manage if a reply form should be open globally.
  // Although each comment also has its own reply toggle,
  // we keep this to reset any global reply state if needed.
  const [replyTo, setReplyTo] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchComments()
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load comments.');
        setLoading(false);
      });
  }, []);

  // Define the schema for comment content using Zod
  const commentSchema = z.object({
    content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment is too long'),
  });
  type CommentFormInputs = z.infer<typeof commentSchema>;

  // React Hook Form setup for top-level comment submission
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormInputs>({
    resolver: zodResolver(commentSchema),
  });

  // Helper function to add a new comment or a reply to the existing comments list
  const handleAddComment = (content: string, parentId: string | null = null) => {
    const newComment: Comment = {
      id: Date.now().toString(), // Simple unique id based on timestamp
      author: 'Current User', // This should ideally come from authenticated user data
      content,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    if (parentId === null) {
      setComments((prev) => [newComment, ...prev]);
    } else {
      // Recursively update comments to add the reply
      setComments((prev) => addReply(prev, parentId, newComment));
    }
  };

  // Recursively search for the comment to add a reply under and update it immutably
  const addReply = (comments: Comment[], parentId: string, reply: Comment): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies ? [reply, ...comment.replies] : [reply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: addReply(comment.replies, parentId, reply) };
      }
      return comment;
    });
  };

  // Handler for submitting the top-level comment form
  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      handleAddComment(data.content, replyTo);
      reset();
      setReplyTo(null);
    } catch {
      alert('Failed to post comment');
    }
  };

  // Recursive component for rendering a comment and its replies
  const CommentItem: React.FC<{ comment: Comment; level?: number }> = ({ comment, level = 0 }) => {
    const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

    // React Hook Form setup for the reply form
    const {
      register: registerReply,
      handleSubmit: handleSubmitReply,
      reset: resetReply,
      formState: { errors: replyErrors, isSubmitting: isReplySubmitting },
    } = useForm<CommentFormInputs>({
      resolver: zodResolver(commentSchema),
    });

    // Handler for submitting a reply to a comment
    const onReplySubmit: SubmitHandler<CommentFormInputs> = async (data) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        handleAddComment(data.content, comment.id);
        resetReply();
        setShowReplyForm(false);
      } catch {
        alert('Failed to post reply');
      }
    };

    return (
      <div className={`bg-white rounded-lg shadow-md p-4 mb-4 ${level > 0 ? 'ml-6' : ''}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-arial-sans-serif text-[#2c3e50]">{comment.author}</h3>
          <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
        <p className="mt-2 font-georgia-serif text-base text-[#2c3e50]">{comment.content}</p>
        <div className="flex space-x-4 mt-2">
          <button
            type="button"
            className="flex items-center text-[#3498db] hover:text-[#e74c3c] transition duration-300"
            onClick={() => setShowReplyForm(!showReplyForm)}
            aria-label="Reply to comment"
          >
            <MessageSquare size={16} className="mr-1" /> Reply
          </button>
        </div>
        {showReplyForm && (
          <form onSubmit={handleSubmitReply(onReplySubmit)} className="mt-4">
            <textarea
              {...registerReply('content')}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia-serif text-base"
              placeholder="Write your reply..."
            ></textarea>
            {replyErrors.content && (
              <p className="text-red-500 text-sm mt-1">{replyErrors.content.message}</p>
            )}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="flex items-center bg-[#3498db] text-white rounded-md px-4 py-2 hover:bg-[#e74c3c] transition duration-300 disabled:opacity-50"
                disabled={isReplySubmitting}
              >
                Reply <ArrowRightCircle size={18} className="ml-2" />
              </button>
            </div>
          </form>
        )}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-arial-sans-serif text-[#2c3e50] mb-4">Comments</h2>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="w-6 h-6 border-4 border-[#3498db] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      <div className="mb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-4">
          <textarea
            {...register('content')}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#3498db] font-georgia-serif text-base"
            placeholder="Add a comment..."
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="flex items-center bg-[#3498db] text-white rounded-md px-4 py-2 hover:bg-[#e74c3c] transition duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Send <Send size={18} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;