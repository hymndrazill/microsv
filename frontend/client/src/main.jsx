import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import CreateUserPage from "./pages/CreateUser.jsx";
import NotFound from "./pages/NotFound.jsx";
import UsersPage from "./pages/UserPage.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import PostDetail from "./components/PostDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users/create" element={<CreateUserPage />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route path="/posts/create" element={<CreatePost />} />
      <Route path="/usesr" element={<UsersPage />} />

      {/* <ProtectedRoute path="/users" element={<UsersPage />} />
      <ProtectedRoute path="/" element={<Home />} />
      <ProtectedRoute path="/users/create" element={<CreateUserPage />} />
      <ProtectedRoute path="/posts" element={<PostPage />} />
      <ProtectedRoute path="/posts/:postId" element={<PostDetail />} />
      <ProtectedRoute path="/posts/create" element={<CreatePost />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <LoginProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  // </LoginProvider>
);
