import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerMenu = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#1E2A38",
        height: "100%",
        color: "#fff",
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 4, color: "#D4AF37", fontWeight: "700" }}>
        Menu
      </Typography>

      <SignedIn>
        <List>
          <ListItem>
            <Button
              component={Link}
              to="/create-blog"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #D4AF37, #C6A02D)",
                color: "#1E2A38",
                textTransform: "none",
                borderRadius: "25px",
                width: "100%",
              }}
            >
              New Post
            </Button>
          </ListItem>
          <ListItem>
            <UserButton afterSignOutUrl="/" />
          </ListItem>
        </List>
      </SignedIn>

      <SignedOut>
        <List>
          <ListItem>
            <SignInButton mode="modal">
              <Button
                variant="outlined"
                sx={{
                  color: "#D4AF37",
                  borderColor: "#D4AF37",
                  borderRadius: "25px",
                  width: "100%",
                }}
              >
                Login
              </Button>
            </SignInButton>
          </ListItem>

          <ListItem>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #D4AF37, #C6A02D)",
                color: "#1E2A38",
                borderRadius: "25px",
                width: "100%",
              }}
            >
              Register
            </Button>
          </ListItem>
        </List>
      </SignedOut>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: alpha("#0F141A", 0.85),
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 215, 0, 0.25)",
          px: { xs: 2, sm: 6 },
          boxShadow: "0px 4px 18px rgba(212,175,55,0.35)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#D4AF37",
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: 2,
              transition: "0.3s",
              "&:hover": {
                textShadow: "0 0 12px rgba(212,175,55,0.9)",
              },
            }}
          >
            Blog<span style={{ color: "#ffffff" }}>Base</span>
          </Typography>

          {/* Desktop Actions */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, alignItems: "center" }}>
            <SignedIn>
              <Button
                component={Link}
                to="/create-blog"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #D4AF37, #C6A02D)",
                  color: "#1E2A38",
                  textTransform: "none",
                  borderRadius: "25px",
                  fontWeight: "600",
                  "&:hover": { boxShadow: "0 0 15px rgba(212,175,55,0.7)" },
                }}
              >
                New Post
              </Button>

              <UserButton appearance={{
                elements: {
                  avatarBox: { width: 42, height: 42, border: "2px solid #D4AF37" },
                },
              }} />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="outlined"
                  sx={{
                    color: "#D4AF37",
                    borderColor: "#D4AF37",
                    borderRadius: "25px",
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
              </SignInButton>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #D4AF37, #C6A02D)",
                  color: "#1E2A38",
                  borderRadius: "25px",
                  textTransform: "none",
                }}
              >
                Register
              </Button>
            </SignedOut>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton onClick={handleDrawerToggle} sx={{ display: { sm: "none" }, color: "#D4AF37" }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerMenu}
      </Drawer>
    </>
  );
}
