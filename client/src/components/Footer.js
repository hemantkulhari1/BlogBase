import React from "react";
import { Box, Typography, Link as MuiLink, IconButton } from "@mui/material";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0E1318, #1A2430)",
        color: "#E9D8A6",
        textAlign: "center",
        py: 4,
        mt: "auto",
        borderTop: "1px solid rgba(212,175,55,0.18)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Brand */}
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          letterSpacing: 1.5,
          color: "#D4AF37",
        }}
      >
        Blog<span style={{ color: "#ffffff" }}>Base</span>
      </Typography>

      {/* Tagline */}
      <Typography
        variant="body2"
        sx={{
          mt: 0.8,
          color: "rgba(255,255,255,0.7)",
          maxWidth: 600,
          mx: "auto",
          fontSize: "0.9rem",
        }}
      >
        A place to share stories, learn, and grow. Stay curious. Stay creative.
      </Typography>

      {/* Social Icons */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <IconButton
          component="a"
          href="https://github.com/hemantkulhari1"
          target="_blank"
          sx={{
            color: "#D4AF37",
            "&:hover": { color: "#ffffff", transform: "scale(1.2)" },
            transition: "0.3s",
          }}
        >
          <FaGithub size={22} />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.linkedin.com/in/hemant-kulhari"
          target="_blank"
          sx={{
            color: "#D4AF37",
            "&:hover": { color: "#ffffff", transform: "scale(1.2)" },
            transition: "0.3s",
          }}
        >
          <FaLinkedin size={22} />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.instagram.com/hemantkulhari1"
          target="_blank"
          sx={{
            color: "#D4AF37",
            "&:hover": { color: "#ffffff", transform: "scale(1.2)" },
            transition: "0.3s",
          }}
        >
          <FaInstagram size={22} />
        </IconButton>
      </Box>

      {/* Links */}
      {/* Links */}
      <Box sx={{ mt: 1.5 }}>
        {[
          { label: "Privacy Policy", href: "/BlogBase-privacy_policy.pdf", external: true },
          { label: "Contact", href: "mailto:hemantkulhari4447@gmail.com", external: true },
        ].map((item, index) => (
          <MuiLink
            key={index}
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noopener noreferrer" : ""}
            sx={{
              color: "#D4AF37",
              mx: 1.8,
              textDecoration: "none",
              fontSize: "0.9rem",
              "&:hover": { color: "#ffffff" },
              transition: "0.3s",
            }}
          >
            {item.label}
          </MuiLink>
        ))}
      </Box>


      {/* Bottom note */}
      <Typography
        variant="body2"
        sx={{
          mt: 3,
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.85rem"
        }}
      >
        © {new Date().getFullYear()} <strong>BlogBase</strong> • Crafted with ❤️ by Hemant
      </Typography>
    </Box>
  );
}
