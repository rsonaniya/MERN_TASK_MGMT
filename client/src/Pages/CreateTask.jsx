import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await dispatch(addTask(data));
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Task
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#f5f5f5",
          p: 4,
          borderRadius: 2,
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 4,
              message: "Title must be at least 4 characters",
            },
          })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
        />

        <TextField
          label="Due Date"
          variant="outlined"
          name="dueDate"
          type="date"
          fullWidth
          {...register("dueDate", {
            required: "Due date is required",
            validate: (value) => {
              const today = new Date().toISOString().split("T")[0];
              if (value < today) {
                return "Due date cannot be earlier than today";
              }
              return true;
            },
          })}
          error={Boolean(errors.dueDate)}
          helperText={errors.dueDate?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth error={Boolean(errors.priority)}>
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            {...register("priority", { required: "Priority is required" })}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          <FormHelperText>{errors.priority?.message}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Task
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTask;
