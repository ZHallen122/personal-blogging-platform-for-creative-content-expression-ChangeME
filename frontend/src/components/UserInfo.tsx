import React, { useEffect, useState } from 'react';
import { Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on mount for page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User = await response.json();

        // If data is empty or undefined, throw an error to activate the mock data branch
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Empty data');
        }
        setUser(data);
      } catch (err) {
        console.error('Fetch user error:', err);
        // Fallback mock data in case of error or empty response
        setUser({
          id: 'mock-1',
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          avatarUrl: 'https://picsum.photos/100/100',
          bio: 'Passionate blogger and creative thinker.',
        });
        setError('Failed to fetch user data, displaying default information.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    // Placeholder for edit functionality,
    // in production, this might navigate to an edit profile page or open a modal.
    alert('Edit Profile clicked!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div
          className="w-8 h-8 border-4 border-t-4 border-t-[#3498db] border-gray-200 rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center text-sm text-red-600">
        Unable to load user information.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6">
          <CardTitle className="text-[24px] text-[#2c3e50] font-arial-sans">
            {user.name}
          </CardTitle>
          <Button
            onClick={handleEdit}
            type="button"
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-[#3498db] hover:bg-[#e74c3c] text-white rounded-full px-4 py-2 transition transform hover:scale-105"
          >
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
            <img
              src={user.avatarUrl || 'https://picsum.photos/100/100'}
              alt={`${user.name} avatar`}
              className="w-20 h-20 rounded-full object-cover mb-4 sm:mb-0"
            />
            <div className="text-center sm:text-left">
              <p className="text-base text-[#2c3e50] font-georgia">{user.email}</p>
              {user.bio && (
                <p className="mt-2 text-sm text-[#2c3e50] font-georgia">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {error && (
        <p className="mt-4 text-center text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default UserInfo;