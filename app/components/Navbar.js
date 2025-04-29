"use client";

import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import AddRecipeModal from "./AddRecipeModal";
import Link from "next/link";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Stack,
  NoSsr,
  Backdrop,
  Card,
  TextField,
  Drawer,
  IconButton,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

import Lottie from "lottie-react";
import foodAnimation from "../../public/food.json";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar({
  showSearch = false,
  searchTerm,
  setSearchTerm,
}) {
  const { isAuthenticated, refreshUser } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2500);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refreshUser();
    router.push("/");
    setShowProfileMenu(false);
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

            {showSearch && (
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes…"
                size="small"
                sx={{ width: 300 }}
              />
            )}

            <Stack direction="row" spacing={2}>
              {isAuthenticated && (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setShowModal(true)}
                  >
                    Add Recipe
                  </Button>
                  <IconButton onClick={() => setShowProfileMenu(true)}>
                    <AccountCircleIcon fontSize="large" />
                  </IconButton>
                </>
              )}
              {!isAuthenticated && (
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
          sx={{ zIndex: 1000, backgroundColor: "rgba(0,0,0,0.25)" }}
        >
          <Card
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
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

      {/* Drawer Profile Menu */}
      <Drawer
        anchor="right"
        open={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: "white",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        }}
        ModalProps={{
          BackdropProps: {
            style: { backgroundColor: "rgba(0, 0, 0, 0.15)" },
          },
        }}
      >
        <Button
          fullWidth
          variant="text"
          onClick={() => {
            router.push("/favorites");
            setShowProfileMenu(false);
          }}
        >
          My Favorites
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => {
            router.push("/my-recipes");
            setShowProfileMenu(false);
          }}
        >
          My Recipes
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Drawer>

      {showModal && (
        <AddRecipeModal
          onClose={() => setShowModal(false)}
          onSubmitSuccess={handleCloseModal}
        />
      )}
    </>
  );
}
