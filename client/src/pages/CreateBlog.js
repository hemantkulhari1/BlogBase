import React, { useState } from "react";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";
import API from "../api";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { useUser } from "@clerk/clerk-react"; // ✅ Import Clerk user

export default function CreateBlog() {
  const navigate = useNavigate();
  const { user } = useUser(); // ✅ Get Clerk user

  const [inputs, setInputs] = useState({
    title: "",
    excerpt: "",
    tag: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const payload = {
      title: inputs.title,
      excerpt: inputs.excerpt,
      category: inputs.tag,
      image: inputs.image || "https://via.placeholder.com/800x400",
      content: inputs.content,
      author: user.id, // ✅ Correct
    };

    console.log("SENDING =>", payload); // Debug

    const { data } = await API.post("/api/v1/blog/create-blog", payload);

    if (data?.success) navigate("/blogs");
  } catch (error) {
    console.log("Error:", error.response?.data || error);
  }
};

  return (
    <PageTransition>
      <Box
        sx={{
          minHeight: "100vh",
          px: 3,
          py: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(180deg, #0E1318, #1A2430)",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: "800px",
            p: 4,
            borderRadius: "18px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: "#D4AF37",
              textAlign: "center",
            }}
          >
            Create New Post
          </Typography>

          {["title", "excerpt", "tag", "image", "content"].map((field, index) => (
            <TextField
              key={index}
              label={
                field === "tag"
                  ? "Tag / Category"
                  : field === "content"
                  ? "Content (HTML / Markdown)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              variant="outlined"
              fullWidth
              name={field}
              value={inputs[field]}
              onChange={handleChange}
              multiline={field === "content"}
              rows={field === "content" ? 8 : 1}
              sx={{ mb: 3 }}
              InputProps={{
                style: {
                  background: "#1A2430",
                  color: "white",
                  borderRadius: "10px",
                },
              }}
              InputLabelProps={{
                style: { color: "#A7A7A7" },
              }}
            />
          ))}

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              background: "#D4AF37",
              color: "#1A2430",
              fontWeight: 600,
              py: 1.4,
              borderRadius: "10px",
              "&:hover": { background: "#e5c472" },
            }}
          >
            Publish
          </Button>
        </Paper>
      </Box>
    </PageTransition>
  );
}
