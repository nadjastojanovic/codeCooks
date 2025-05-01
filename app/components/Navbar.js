"use client";

import { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Backdrop,
  Card,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";
import { useRouter } from "next/navigation";

// lottie files animations (new library)
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import foodAnimation from "../../public/food.json"; // stored the food animation in public

import AddRecipeModal from "./AddRecipeModal";
import { useAuth } from "../context/authContext";

export default function Navbar({
  showSearch = false,
  searchTerm,
  setSearchTerm,
  refreshRecipes,
}) {
  const { isAuthenticated, refreshUser } = useAuth();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // responsive
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
    refreshUser();
  }, []);

  const handleRecipeCreated = () => {
    refreshRecipes?.(); // after they add new recipe, it should update the grid in place
    setShowModal(false); // hide the add recipe popup
    setShowAnimation(true); // show foodie animation
    setTimeout(() => setShowAnimation(false), 2500); // for 2500ms
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refreshUser();
    router.push("/"); // reroute
    setShowDrawer(false); // can hide entirely bc unauth. users don't have my recipes or my favorites pages
  };

  /* -- DRAWER MENU -- */
  const drawerItems = (
    <List sx={{ width: 250 }}>
      {showSearch && (
        <ListItem>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes…"
            size="small"
            fullWidth
          />
        </ListItem>
      )}
      {isAuthenticated && (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setShowModal(true);
              setShowDrawer(false);
            }}
          >
            <ListItemText primary="Add Recipe" />
          </ListItemButton>
        </ListItem>
      )}
      <Divider />
      {isAuthenticated ? (
        <>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push("/favorites");
                setShowDrawer(false);
              }}
            >
              <ListItemText primary="My Favorites" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push("/my-recipes");
                setShowDrawer(false);
              }}
            >
              <ListItemText primary="My Recipes" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/login"
              onClick={() => setShowDrawer(false)}
            >
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/signup"
              onClick={() => setShowDrawer(false)}
            >
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            CodeCooks
          </Typography>

          {isSmUp ? (
            // large screen sizes:
            <Stack direction="row" spacing={2} alignItems="center">
              {showSearch && (
                // allow users to search (only by recipe name for now, should probably also match for words in description, ingredients and steps)
                <TextField
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search recipes…"
                  size="small"
                  sx={{ width: 300 }}
                />
              )}

              {isAuthenticated ? (
                <>
                  <Button
                    variant="contained"
                    onClick={() => setShowModal(true)}
                  >
                    Add Recipe
                  </Button>
                  <IconButton onClick={() => setShowDrawer(true)}>
                    <AccountCircleIcon fontSize="large" />
                  </IconButton>
                </>
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
          ) : (
            // small screen sizes (switch to hamburder menu for search, add recipe and drawer menu)
            <IconButton onClick={() => setShowDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* -- DRAWER MENU -- */}
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        {drawerItems}
      </Drawer>

      {showModal && (
        <AddRecipeModal
          onClose={() => setShowModal(false)}
          onRecipeAdded={handleRecipeCreated}
        />
      )}

      {/* animation after submitting a new recipe successfully */}
      {hasMounted && showAnimation && (
        <Backdrop open sx={{ zIndex: 2000 }}>
          <Card sx={{ p: 3, textAlign: "center" }}>
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
      )}
    </>
  );
}
