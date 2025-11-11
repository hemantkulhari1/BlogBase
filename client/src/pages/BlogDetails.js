// client/src/pages/BlogDetails.js
import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import PageTransition from "../components/PageTransition";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/api/v1/blog/get-blog/${id}`);
        if (data?.success) setBlog(data.blog);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!blog) return <Container sx={{ mt: 6 }}>Loading...</Container>;

  return (
    <PageTransition>
      <Container sx={{ mt: 6, mb: 8 }}>
        <Box sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 6 }}>
          <Box component="img" src={blog.image} alt={blog.title} sx={{ width: "100%", height: { xs: 220, md: 380 }, objectFit: "cover" }} />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip label={blog?.tag || "General"} color="secondary" />
            <Typography variant="caption" color="text.secondary">{new Date(blog.createdAt).toLocaleDateString()}</Typography>
          </Box>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 800 }}>{blog.title}</Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, color: "text.secondary" }}>{blog.description}</Typography>

          <Box sx={{ mt: 3 }}>
            <div dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content</p>" }} className="post-rich" />
          </Box>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/my-blogs")}>My posts</Button>
            {localStorage.getItem("userId") === blog?.user?._id && (
              <Button variant="contained" color="primary" onClick={() => navigate(`/create-blog?id=${id}`)}>Edit</Button>
            )}
          </Box>
        </Box>
      </Container>
    </PageTransition>

  );
}
