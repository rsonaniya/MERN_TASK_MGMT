import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

export default function NavBar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">TaskMate</Link>
          </Typography>
          {user ? (
            <Link>
              <Button
                variant="contained"
                color="success"
                endIcon={<LogoutIcon />}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                color="success"
                startIcon={<LoginIcon />}
              >
                Log In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
