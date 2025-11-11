import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Blogs from "./pages/Blogs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Footer from "./components/Footer";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/store";
import toast, { Toaster } from "react-hot-toast";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import PageTransition from "./components/PageTransition"; // ✅ Animation wrapper

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#313647" },
    secondary: { main: "#435663" },
    accent: { main: "#A3B087" },
    background: {
      default: "#F5F6F3",
      paper: "#ffffff",
    },
    text: {
      primary: "#313647",
      secondary: "#435663",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h5: { fontWeight: 600 },
    body1: { color: "#313647" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) dispatch(authActions.login());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />

      {/* ✅ Sticky layout container */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />

        {/* ✅ Page container to allow footer to push down */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Blogs />
                </PageTransition>
              }
            />
            <Route
              path="/blogs"
              element={
                <PageTransition>
                  <Blogs />
                </PageTransition>
              }
            />
            <Route
              path="/blog-details/:id"
              element={
                <PageTransition>
                  <BlogDetails />
                </PageTransition>
              }
            />

            {/* ✅ Protected route with Clerk */}
           <Route
  path="/create-blog"
  element={
    <SignedIn>
      <CreateBlog />
    </SignedIn>
  }
/>
<Route
  path="/create-blog"
  element={
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  }
/>


            <Route
              path="/my-blogs"
              element={
                <PageTransition>
                  <UserBlogs />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />
            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
