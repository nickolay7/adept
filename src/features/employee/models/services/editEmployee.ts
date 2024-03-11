import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
export const editEmployee = createAsyncThunk<
  Employee,
  Employee,
  ThunkConfig<string>
>('@@employeesTable/editEmployee', async (employee, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const response = await api.patch(`/employees/${employee.id}`, employee);

    if (!response.data) {
      throw new Error('error');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error editing employee');
  }
});
