import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid2,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../features/userSlice";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);
  const onSubmit = async (data) => {
    dispatch(signUp(data))
      .unwrap()
      .then(() => {
        toast.success("Sign Up Successful");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  console.log("user", loading, user, error);
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoFocus
            {...register("fullName", {
              required: "Full Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cnfPassword"
            label="Confirm Password"
            type="password"
            id="cnfPassword"
            autoComplete="current-password"
            {...register("cnfPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            error={!!errors.cnfPassword}
            helperText={errors.cnfPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid2 container>
            <Grid2 item>
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                <Link to="/login">Have an account? Log In</Link>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
