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
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import foodAnimation from "../../public/food.json";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar({
  showSearch = false,
  searchTerm,
  setSearchTerm,
  refreshRecipes,
}) {
  const { isAuthenticated, refreshUser } = useAuth();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [showAnimation, setShowAnimation] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
    refreshUser();
  }, []);

  const handleRecipeCreated = () => {
    refreshRecipes?.();
    setShowModal(false);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2500);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await refreshUser();
    router.push("/");
    setShowDrawer(false);
  };

  // Drawer contents
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
          <ListItemButton onClick={() => { setShowModal(true); setShowDrawer(false); }}>
            <ListItemText primary="Add Recipe" />
          </ListItemButton>
        </ListItem>
      )}
      <Divider />
      {isAuthenticated ? (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { router.push("/favorites"); setShowDrawer(false); }}>
              <ListItemText primary="My Favorites" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => { router.push("/my-recipes"); setShowDrawer(false); }}>
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
            <ListItemButton component={Link} href="/login" onClick={() => setShowDrawer(false)}>
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} href="/signup" onClick={() => setShowDrawer(false)}>
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
          {/* logo/title */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            CodeCooks
          </Typography>

          {isSmUp ? (
            // full desktop toolbar
            <Stack direction="row" spacing={2} alignItems="center">
              {showSearch && (
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
                  <Button variant="contained" onClick={() => setShowModal(true)}>
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
            // mobile hamburger
            <IconButton onClick={() => setShowDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for both mobile & desktop profile menu */}
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        {drawerItems}
      </Drawer>

      {/* Add recipe modal */}
      {showModal && (
        <AddRecipeModal onClose={handleRecipeCreated} />
      )}

      {/* Cooking animation */}
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
