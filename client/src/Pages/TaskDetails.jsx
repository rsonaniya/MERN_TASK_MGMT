import { Container, Typography, Button, Box, Paper, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTask, updateTask } from "../features/tasksSlice";
import Loader from "../components/Loader";

const TaskDetails = () => {
  const { taskId } = useParams();

  const handleMarkAsCompleted = () => {
    dispatch(updateTask({ id: taskId, body: { completed: true } }));
  };
  const dispatch = useDispatch();
  const { task, loading } = useSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(getTask(taskId));
  }, [dispatch, taskId]);

  if (loading) return <Loader />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Task Details
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Title:
              </Typography>
              <Typography variant="body1">{task?.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Due Date:
              </Typography>
              <Typography variant="body1">
                {task?.dueDate.split("T")[0]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Priority:
              </Typography>
              <Typography variant="body1">{task?.priority}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Description:
              </Typography>
              <Typography variant="body1">{task?.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Completed:
              </Typography>
              <Typography variant="body1">
                {task?.completed ? "Yes" : "No"}
              </Typography>
            </Grid>
          </Grid>
          <Box align="center" sx={{ mt: 4 }}>
            {!task?.completed && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleMarkAsCompleted}
              >
                Mark as Completed
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskDetails;
