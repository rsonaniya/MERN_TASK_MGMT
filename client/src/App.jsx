import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/SignUpPage";
import ProtectRoute from "./components/ProtectRoute";
import HomePage from "./Pages/HomePage";
import CreateTask from "./Pages/CreateTask";
import TaskDetails from "./Pages/TaskDetails";
import EditTask from "./Pages/EditTask";

export default function App() {
  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/create" element={<CreateTask />} />
          <Route path="/task/:taskId" element={<TaskDetails />} />
          <Route path="/task/edit/:taskId" element={<EditTask />} />
        </Route>
      </Routes>
    </>
  );
}
