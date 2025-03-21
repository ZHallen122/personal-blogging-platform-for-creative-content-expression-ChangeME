import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Post from "./pages/Post";
import Profile from "./pages/Profile";

// This component ensures that the window scrolls to the top whenever the route changes.
const ScrollToTop: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

// Main App component that defines the routing structure.
const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

// Render the application with the proper provider hierarchy.
// BrowserRouter is the outermost provider, followed by NavigationProvider and UserProvider.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NavigationProvider>
    </BrowserRouter>
  </React.StrictMode>
);