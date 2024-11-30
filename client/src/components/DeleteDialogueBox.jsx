import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasksSlice";

export default function DeleteDialogueBox({
  modalOpen,
  closeModal,
  taskIdToDelete,
}) {
  const dispatch = useDispatch();
  const handleDeleteClick = async () => {
    await dispatch(deleteTask(taskIdToDelete));
    closeModal();
  };

  return (
    <>
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ padding: 10 }}
      >
        <DialogTitle id="alert-dialog-title" align="center">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <DialogContentText id="alert-dialog-description" textAlign="center">
            <ErrorOutlineIcon sx={{ fontSize: "30px" }} />
            <p>Are you sure you want to delete this task?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button onClick={closeModal} variant="outlined" color="inherit">
            Go Back
          </Button>
          <Button
            onClick={handleDeleteClick}
            color="error"
            variant="contained"
            size="small"
          >
            Yes I am Sure
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
