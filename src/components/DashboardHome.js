import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  color: "rgb(7, 71, 166)",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DashboardHome = () => {
 
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}></AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#0056b3",
          },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? (
              <ChevronLeftIcon sx={{ ...open, color: "#daecff" }} />
            ) : (
              <ChevronRightIcon sx={{ ...open, color: "#daecff" }} />
            )}
            {console.log(open)}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "Dashboard", path: "" },
            { text: "Profile", path: "profile" },
            {text:"TaskList",path:"task-list"}
          ].map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                display: "block",
                backgroundColor: "#0056b3",
                border: "none",
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "#daecff",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: open ? "#daecff" : "inherit",
                  }}
                >
                  {index % 3 === 0 ? (
                    <DashboardIcon />
                  ) : index % 3 === 1 ? (
                    <PersonIcon />
                  ) : (
                    <ListIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {currentUser.role === "manager" && (
            <>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor: "#0056b3",
                  border: "none",
                }}
              >
                <ListItemButton
                  component={Link}
                  to={"user-management"}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#daecff",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: open ? "#daecff" : "inherit",
                    }}
                  >
                    {<PeopleIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={"User Management"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  backgroundColor: "#0056b3",
                  border: "none",
                }}
              >
                <ListItemButton
                  component={Link}
                  to={"add-task"}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#daecff",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: open ? "#daecff" : "inherit",
                    }}
                  >
                    {<AddIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={"Add Task"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        <Divider />
        <List
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <ListItem
            disablePadding
            sx={{
              backgroundColor: "#0056b3",
              border: "none",
            }}
          >
            <ListItemButton
              component={Link}
              to={"/"}
              onClick={logout}
              sx={{
                justifyContent: "center",
                px: 2.5,
                color: "#daecff",
              }}
            >
              <PowerSettingsNewIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              ></PowerSettingsNewIcon>

              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <DrawerHeader />

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>  <Outlet />

      </Box>
    </Box>
  );
};

export default DashboardHome;
