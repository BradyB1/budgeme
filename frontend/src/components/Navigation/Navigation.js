import * as React from "react";
import { useNavigate } from "react-router-dom";  
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = [
  { name: "Dashboard", path: "/" },
  { name: "Income", path: "/income" },
  { name: "Expenses", path: "/expenses" },
  { name: "Transactions", path: "/transactions" }
];

const settings = ["Profile","Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState(null);
  const userId = localStorage.getItem("userId");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    console.log("🚀 Logging out user...");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  React.useEffect(() => {
          const fetchUserData = async () => {
              if (!userId) return;
  
              try {
                  const response = await fetch(`http://localhost:3000/api/v1/get-user/${userId}`);
                  if (!response.ok) throw new Error("Failed to fetch user data");
  
                  const data = await response.json();
                  setUserData(data);
              } catch (error) {
                  console.error("Error fetching user data:", error);
              }
          };
  
          fetchUserData();
      }, [userId]);
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BudgeMe
          </Typography>

          {userId && (
            <>
              {/* Mobile Menu */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={() => navigate(page.path)}>
                      <Typography>{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

            {/* Mobile Title - Centered */}
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#"
                href="#"
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" }, 
                  justifyContent: "center", 
                  fontFamily: "monospace",
                  fontWeight: 800,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  position: "absolute", 
                  left: "50%",
                  transform: "translateX(-50%)", 
                }}
              >
                BudgeMe
              </Typography>

              {/* Desktop Menu */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => navigate(page.path)}  
                    sx={{
                      my: 2,
                      color: "white",
                      fontWeight: "bold",
                      display: "block",
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              {/* User Avatar Menu */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar style={{ border: "2px solid gray", margin:10}} alt={!userData || !userData.username ? "unknown" : userData.username.toUpperCase()} src="/static/images/avatar/1.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    
                    <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();  
                      if (setting === "Logout") {
                        handleLogout();
                      } else if (setting === "Dashboard") {
                        navigate("/");  
                      } else if (setting === "Profile") {
                        navigate("/profile"); 
                      } 
                    }}
>
                      <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
