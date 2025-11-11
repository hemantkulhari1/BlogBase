// Replace client/src/components/BlogCard.jsx with this
import React from "react";

const BlogCard = React.memo(function BlogCard({ post }) {
  // ensure image has lazy loading and safe fallback
  const imgSrc = post.image || "/placeholder-400x300.png";

  return (
    <article className="blog-card" style={{ borderRadius: 8, overflow: "hidden" }}>
      <img
        src={imgSrc}
        alt={post.title}
        loading="lazy"
        width="400"
        height="240"
        style={{ width: "100%", height: 240, objectFit: "cover" }}
      />
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: "6px 0" }}>{post.title}</h3>
        <p style={{ margin: 0, color: "#555" }}>{post.excerpt}</p>
        <small style={{ display: "block", marginTop: 8 }}>{new Date(post.createdAt).toLocaleDateString()}</small>
      </div>
    </article>
  );
});

export default BlogCard;
