import React, { useEffect, useState } from "react";
import "./App.css";
import Tables from "./components/Tables";
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
import ApplicationUrl from "./components/ApplicationUrl";
import axios from "axios";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function App() {
  const [rows, setRows] = useState<
    // {
    //   companyName: String;
    //   jobRole: number;
    //   jobDesc: String;
    //   dateOfApplication: String;
    //   location: String;
    //   status: number;
    // }[]
    any[]
  >([]);
  const id = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`https://localhost:8080/${id}`);
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // fetchData();
  }, []);

  // setRows([
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  // ]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const rows = [
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  //   {
  //     companyName: "Frozen yoghurt",
  //     jobRole: 159,
  //     jobDesc: "Haha",
  //     dateOfApplication: "16 Mar 2024",
  //     location: "Binghamton",
  //     status: 1,
  //   },
  // ];

  const columns: String[] = [
    "Company Name",
    "Job Role",
    "JD",
    "Date of Application",
    "Location (Optional)",
    "Status",
  ];

  return (
    <div className="App">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JobSearchMadeEasy
            </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JobSearchMadeEasy
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ApplicationUrl />
      <Tables rows={rows} columns={columns} />
    </div>
  );
}

export default App;
