import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
import { AxiosResponse } from 'axios';
export const addEmployee = createAsyncThunk<
  Employee,
  Omit<Employee, 'id'>,
  ThunkConfig<string>
>('@@employeesTable/addEmployee', async (employee, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const response: AxiosResponse<Employee> = await api.post(
      `/employees`,
      employee,
    );

    if (!response.data) {
      throw new Error('error');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error adding employee');
  }
});
