// client/src/pages/Blogs.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import API from "../api";
import PageTransition from "../components/PageTransition";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await API.get("/api/v1/blog/all-blog");
        if (data?.success) setBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <PageTransition>
      <Box
        sx={{
          backgroundColor: "#3D4353",
          minHeight: "100vh",
          py: 6,
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            color: "#A3B087",
            // textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Latest Blogs
        </Typography>

        {/* ✅ Card Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {blogs.map((blog) => (
            <Box
              key={blog._id}
              component={Link}
              to={`/blog-details/${blog._id}`}
              sx={{
                textDecoration: "none",
                borderRadius: "14px",
                overflow: "hidden",
                backgroundColor: "#2C3140",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.45)",
                },
              }}
            >
              <Box
                component="img"
                src={blog.image}
                alt={blog.title}
                sx={{
                  height: 180,
                  width: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
              <Box sx={{ p: 3, flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#A3B087",
                    fontWeight: 600,
                    mb: 1,
                    textTransform: "uppercase",
                    fontSize: "0.8rem",
                  }}
                >
                  {blog.category || "General"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "#fff",
                    lineHeight: 1.3,
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#d9d9d9",
                    fontSize: "0.9rem",
                    mb: 2,
                    height: 65,
                    overflow: "hidden",
                  }}
                >
                  {blog.description}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#A3B087",
                    color: "#A3B087",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#A3B087",
                      color: "#2C3140",
                    },
                  }}
                >
                  Read More
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </PageTransition>

  );
}
