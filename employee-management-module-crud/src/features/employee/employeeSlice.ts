import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

export type Employee = {
  id: string;
  fullName: string;
  email: string;
  department: string;
  profilePic: string;
  joiningDate: string;
};

type EmployeeState = {
  employees: Employee[];
  loading: boolean;
  error: string | null;
};

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employee: Employee) => {
  const response = await axios.post<Employee>('http://localhost:3001/employees', employee);
  return response.data;
});

export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async () => {
  const response = await axios.get<Employee[]>('http://localhost:3001/employees');
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id: string) => {
  await axios.delete(`http://localhost:3001/employees/${id}`);
  return id;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        console.log("Adding employee...");
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
        state.loading = false;
        console.log("Employee added successfully:", action.payload);
      })
      .addCase(addEmployee.rejected, (_state, action) => {
        console.error("Failed to add employee:", action.error.message);
      });

    builder
      .addCase(fetchEmployee.pending, (state) => {
        console.log("Fetching employee...");
        state.loading = true;
      })
      .addCase(fetchEmployee.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
        state.loading = false;
        console.log("Employee fetched successfully:", action.payload);
      })
      .addCase(fetchEmployee.rejected, (_state, action) => {
        console.error("Failed to fetch employee:", action.error.message);
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<string>) => {
        state.employees = state.employees.filter(employee => employee.id !== action.payload);
        state.loading = false;
        console.log("Employee deleted successfully:", action.payload);        
      })    
      .addCase(deleteEmployee.rejected, (_state, action) => {
        console.error("Failed to delete employee:", action.error.message);
        _state.loading = false;
      });
    },
});

export default employeeSlice.reducer;