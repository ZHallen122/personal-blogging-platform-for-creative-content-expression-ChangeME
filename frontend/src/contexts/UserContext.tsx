import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User type with required fields for the blogging platform.
interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

// Define the shape of the UserContext to include the user state and authentication methods.
interface IUserContext {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
}

// Create the UserContext with an initial undefined value to enforce proper usage.
const UserContext = createContext<IUserContext | undefined>(undefined);

// Define the props for the UserProvider component.
interface UserProviderProps {
  children: ReactNode;
}

// The UserProvider component manages the current user state and provides authentication methods.
// It simulates API calls with mock data and includes error handling for robustness.
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulate a login API call, returning mock user data after a slight delay.
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const simulatedResponse = new Promise<User>((resolve) =>
        setTimeout(() => {
          resolve({
            id: 'user-123',
            name: 'Jane Doe',
            email,
            profilePicture: 'https://picsum.photos/500/300',
          });
        }, 500)
      );
      const loggedInUser = await simulatedResponse;
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please try again.');
    }
  };

  // Simulate a registration API call, returning mock user data after a short delay.
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    try {
      const simulatedResponse = new Promise<User>((resolve) =>
        setTimeout(() => {
          resolve({
            id: Math.random().toString(36).substring(2, 15),
            name,
            email,
            profilePicture: 'https://picsum.photos/500/300',
          });
        }, 500)
      );
      const registeredUser = await simulatedResponse;
      setUser(registeredUser);
      return registeredUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  };

  // Log the user out by clearing the user state.
  const logout = (): void => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Package the values and methods into the context value.
  const value: IUserContext = {
    user,
    login,
    register,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {/* Ensures that the page scrolls to the top when the provider mounts for improved navigation */}
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to allow consuming components to easily access the UserContext.
// Throws an error if the hook is used outside of a UserProvider.
export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};