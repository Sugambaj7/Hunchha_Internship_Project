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
  currentPage: number;
};

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  currentPage: 1,
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

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (employee: Employee) => {
    const response = await axios.put<Employee>(
      `http://localhost:3001/employees/${employee.id}`,
      employee
    );
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
     setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
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
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        console.log("Updating employee...");
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex(employee => employee.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.loading = false;
        console.log("Employee updated successfully:", action.payload);
      })
      .addCase(updateEmployee.rejected, (_state, action) => {
        console.error("Failed to update employee:", action.error.message);
        _state.loading = false;
      })
    }
});

export const { setCurrentPage } = employeeSlice.actions;
export default employeeSlice.reducer;