// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { useNavigate } from 'react-router-dom';

// const pages = ['Dashboard', 'Income', 'Expenses', 'Transactions'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function ResponsiveAppBar({ active, setActive }) {

//   const navigate = useNavigate()
//   //check if user logged in 
//   const userId = localStorage.getItem("userId")
//   // ✅ Remove early return and handle errors safely
//   if (typeof setActive !== 'function') {
//     console.error("🚨 setActive is not a function! Make sure it is passed from App.js.");
//   }

//   // ✅ Hooks must always be at the top level, never inside conditions
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleClick = (index) => {
//     if (typeof setActive === 'function') {
//       setActive(index);
//       handleCloseNavMenu(); // Close menu after clicking (for mobile)
//     } else {
//       console.error("❌ setActive is not a function!");
//     }
//   };

//   const handleLogout = () => {
//     console.log("🚀 Logging out user...");
//     localStorage.removeItem("userId"); // ✅ Clear user session
//     navigate("/login");  // ✅ Redirect to login page
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             BudgeMe
//           </Typography>

//           {userId && ( 
//             <>
//           {/* Mobile Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorElNav}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map((page, index) => (
//                 <MenuItem
//                   key={page}
//                   onClick={() => handleClick(index + 1)}
//                   selected={active === index + 1}
//                 >
//                   <Typography sx={{ fontWeight: active === index + 1 ? 'bold' : 'normal' }}>
//                     {page}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Desktop Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page, index) => (
//               <Button
//                 key={page}
//                 onClick={() => handleClick(index + 1)}
//                 sx={{
//                   my: 2,
//                   color: active === index + 1 ? 'yellow' : 'white',
//                   fontWeight: active === index + 1 ? 'bold' : 'normal',
//                   display: 'block',
//                 }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {/* User Avatar Menu */}
//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               anchorEl={anchorElUser}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//               sx={{ mt: '45px' }}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           </>)}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;



import * as React from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
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

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
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

              {/* Desktop Menu */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => navigate(page.path)}  // ✅ Use navigate() instead of setActive()
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
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={setting === "Logout" ? handleLogout : handleCloseUserMenu}>
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
