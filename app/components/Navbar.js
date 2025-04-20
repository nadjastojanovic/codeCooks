"use client";
import { useState } from "react";
import AddRecipeModal from "./AddRecipeModal";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography, Box, Stack } from "@mui/material";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = true; // TODO: Replace with real auth logic

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
              <Button variant="contained" onClick={() => setShowModal(true)}>
                Add Recipe
              </Button>
            )}
            <Button component={Link} href="/favorites">
              My Favorites
            </Button>
            <Button component={Link} href="/my-recipes">
              My Recipes
            </Button>
            {isAuthenticated ? (
              <Button>Log Out</Button>
            ) : (
              <Button component={Link} href="/login">
                Log In / Sign Up
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      {showModal && <AddRecipeModal onClose={() => setShowModal(false)} />}
    </>
  );
}
