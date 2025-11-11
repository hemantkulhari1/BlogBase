// client/src/pages/UserBlogs.js
import React, { useEffect, useState } from "react";
import API from "../api";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import BlogCard from "../components/BlogCard";
import PageTransition from "../components/PageTransition";

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const id = localStorage.getItem("userId");
        const { data } = await API.get(`/api/v1/blog/user-blog/${id}`);
        if (data?.success) setBlogs(data.userBlog.blogs || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <PageTransition>
      <Container sx={{ mt: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>My Posts</Typography>
        <Button variant="contained" href="/create-blog">Create</Button>
      </Box>

      {blogs.length === 0 ? (
        <Typography>No posts yet</Typography>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((b) => (
            <Grid item xs={12} sm={6} md={4} key={b._id}>
              <BlogCard
                id={b._id}
                title={b.title}
                description={b.description}
                image={b.image}
                username={b.user?.username}
                time={b.createdAt}
                isUser
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
    </PageTransition>
    
  );
}
