"use client";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import AddRecipeModal from "./AddRecipeModal";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography, Stack, NoSsr, Backdrop, Card, CardContent, } from "@mui/material";
import { useRouter } from "next/navigation";

import Lottie from "lottie-react"; // new library req
import foodAnimation from "../../public/food.json";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setIsAuthenticated(!!data.user);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2500);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <>
      <NoSsr>
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
        <Backdrop
          open={showAnimation}
          sx={{ zIndex: 1000 }}
        >
          <Card sx={{ p: 2, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Lottie
              animationData={foodAnimation}
              loop
              style={{ width: 150, height: 150 }}
            />
            <Typography variant="h6" sx={{ mt: 1 }}>
              Cooking up your recipe…
            </Typography>
          </Card>
        </Backdrop>
      </NoSsr>
      {showModal && <AddRecipeModal onClose={handleCloseModal} />}
        
    </>
  );
}
