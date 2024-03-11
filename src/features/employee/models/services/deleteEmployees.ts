import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
import { AxiosResponse } from 'axios';
import { Employee } from '../types';
export const deleteEmployees = createAsyncThunk<
  string[],
  string[],
  ThunkConfig<string>
>('@@employeesTable/deleteEmployees', async (employeeIds, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const deletePromises: Promise<AxiosResponse<Employee>>[] = employeeIds.map(
      (employeeId) => api.delete(`/employees/${employeeId}`),
    );

    const response: AxiosResponse<Employee>[] = await Promise.all(
      deletePromises,
    );

    if (!response.every((r) => r.status === 200)) {
      throw new Error('error');
    }

    return response.map((r) => r.data.id);
  } catch (e) {
    return rejectWithValue('error deleting employees');
  }
});
