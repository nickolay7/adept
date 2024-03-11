import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeesSchema } from './types';
import { fetchEmployees } from './services/fetchEmployees';
import { editEmployee } from '@/features/employee';
import { addEmployee } from './services/addEmployee';
import { deleteEmployees } from './services/deleteEmployees';

const initialState: EmployeesSchema = {
  isLoading: false,
  error: '',
  data: [] as Employee[],
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editEmployee.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        editEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.isLoading = false;
          const updatedEmployee = action.payload;
          state.data = state.data.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee,
          );
        },
      )
      .addCase(editEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(
        addEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.data.push(action.payload);
        },
      )
      .addCase(
        deleteEmployees.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          const employeesIds = action.payload;
          state.data = state.data.filter(
            (employee) => !employeesIds.includes(employee.id),
          );
        },
      );
  },
});
export const employeesReducer = employeesSlice.reducer;
