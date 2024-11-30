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
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getTask, updateTask } from "../features/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { task, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTask(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        priority: task.priority,
      });
    }
  }, [task, reset]);

  const onSubmit = async (body) => {
    await dispatch(updateTask({ id: taskId, body }));
    navigate("/");
  };

  if (loading)
    return (
      <Box align="center" sx={{ marginTop: 20 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography align="center" color="error" variant="h6" sx={{ mt: 4 }}>
        Failed to load task. Please try again.
      </Typography>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit The Task &quot;{task?.title}&quot;
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
            defaultValue={task?.priority}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          <FormHelperText>{errors?.priority?.message}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditTask;
