import {
  Container,
  Grid2,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import { getTasks } from "../features/tasksSlice";
import DeleteDialogueBox from "../components/DeleteDialogueBox";
import Loader from "../components/Loader";

const HomePage = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState("");
  const { user } = useSelector((state) => state.user);
  const { tasks, loading } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High" && !task.completed
  );
  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "Medium" && !task.completed
  );
  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === "Low" && !task.completed
  );
  const completedTasks = tasks.filter((task) => task.completed);

  const getDueStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysLeft = differenceInDays(due, today);
    if (daysLeft <= 2)
      return {
        color: "red",
        text: `Due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`,
      };
    if (daysLeft <= 5)
      return {
        color: "#7a7a17",
        text: `Due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`,
      };
    return {
      color: "green",
      text: `Due in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`,
    };
  };

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleEditClick = (taskId) => {
    navigate(`/task/edit/${taskId}`);
  };

  const handleDeleteClick = (taskId) => {
    console.log(taskId);
    setTaskIdToDelete(taskId);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome, {user.fullName}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ padding: "6px 16px" }}
        >
          <Link
            to="/task/create"
            style={{ textDecoration: "none", color: "white" }}
          >
            Add Task
          </Link>
        </Button>
      </Box>

      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        High Priority Tasks
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid2 container spacing={3}>
          {highPriorityTasks.length === 0 ? (
            <Typography>No High Priority Tasks</Typography>
          ) : (
            highPriorityTasks.map((task) => {
              const dueStatus = getDueStatus(task.dueDate);
              return (
                <Grid2 item xs={12} sm={6} md={4} key={task._id}>
                  <Card
                    sx={{ minWidth: 275, border: "1px solid red" }}
                    onClick={() => handleTaskClick(task._id)}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>

                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(task._id);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: dueStatus.color }}
                      >
                        {dueStatus.text}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(task._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid2>
              );
            })
          )}
        </Grid2>
      )}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", mt: 4, textAlign: "center" }}
      >
        Medium Priority Tasks
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid2 container spacing={3}>
          {mediumPriorityTasks.length === 0 ? (
            <Typography>No Medium Priority Tasks</Typography>
          ) : (
            mediumPriorityTasks.map((task) => {
              const dueStatus = getDueStatus(task.dueDate);
              return (
                <Grid2 item xs={12} sm={6} md={4} key={task._id}>
                  <Card
                    sx={{ minWidth: 275, border: "1px solid #9b7e3f" }}
                    onClick={() => handleTaskClick(task._id)}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>

                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(task._id);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: dueStatus.color }}
                      >
                        {dueStatus.text}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(task._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid2>
              );
            })
          )}
        </Grid2>
      )}

      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", mt: 4, textAlign: "center" }}
      >
        Low Priority Tasks
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid2 container spacing={3}>
          {lowPriorityTasks.length === 0 ? (
            <Typography>No Low Priority Tasks</Typography>
          ) : (
            lowPriorityTasks.map((task) => {
              const dueStatus = getDueStatus(task.dueDate);
              return (
                <Grid2 item xs={12} sm={6} md={4} key={task._id}>
                  <Card
                    sx={{ minWidth: 275, border: "1px solid green" }}
                    onClick={() => handleTaskClick(task._id)}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>

                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(task._id);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <Typography
                        variant="body2"
                        sx={{ color: dueStatus.color }}
                      >
                        {dueStatus.text}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(task._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid2>
              );
            })
          )}
        </Grid2>
      )}

      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mt: 4 }}>
        Completed Tasks
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid2 container spacing={3}>
          {completedTasks.length === 0 ? (
            <Typography>No Completed Tasks</Typography>
          ) : (
            completedTasks.map((task) => {
              return (
                <Grid2 item xs={12} sm={6} md={4} key={task._id}>
                  <Card
                    sx={{
                      minWidth: 275,
                      border: "1px solid green",
                      bgcolor: "#ccc",
                    }}
                    onClick={() => handleTaskClick(task._id)}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>

                      <Typography variant="body2">
                        {task.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(task._id);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(task._id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid2>
              );
            })
          )}
        </Grid2>
      )}
      <DeleteDialogueBox
        modalOpen={deleteModalOpen}
        taskIdToDelete={taskIdToDelete}
        closeModal={() => setDeleteModalOpen(false)}
      />
    </Container>
  );
};

export default HomePage;
