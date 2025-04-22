"use client";

import { useEffect, useState } from "react";
import AddRecipeModal from "./AddRecipeModal";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setIsAuthenticated(!!data.user);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            CodeCooks
          </Typography>
          <Stack direction="row" spacing={2}>
            {isAuthenticated && (
              <>
                <Button variant="contained" onClick={() => setShowModal(true)}>
                  Add Recipe
                </Button>
                <Button component={Link} href="/favorites">
                  My Favorites
                </Button>
                <Button component={Link} href="/my-recipes">
                  My Recipes
                </Button>
              </>
            )}
            {isAuthenticated ? (
              <Button onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Button component={Link} href="/login">
                  Log In
                </Button>
                <Button component={Link} href="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {showModal && <AddRecipeModal onClose={() => setShowModal(false)} />}
    </>
  );
}
