import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createTaskApi from "../api/createTask";
import deleteTaskApi from "../api/deleteTask";
import getTaskApi from "../api/getTask";
import getTasksApi from "../api/getTasks";
import updateTaskApi from "../api/updateTask";

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createTaskApi(body);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteTaskApi(id);
      if (response.status === 204) {
        return id;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTasksApi();
      if (response.status === 200) {
        return response.data.notes;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTaskApi(id);
      if (response.status === 200) {
        return response.data.note;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await updateTaskApi(id, body);
      if (response.status === 200) {
        return response.data.updatedNote;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    task: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.tasks = [];
      state.task = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks";
      });

    builder
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.error = null;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch task";
      });

    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create task";
      });

    builder
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete task";
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update task";
      });
  },
});

export const { logout } = tasksSlice.actions;

export default tasksSlice.reducer;
