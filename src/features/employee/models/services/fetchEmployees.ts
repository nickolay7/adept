import { createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
export const fetchEmployees = createAsyncThunk<
  Employee[],
  string | undefined,
  ThunkConfig<string>
>('@@employeesTable/fetchEmployeesList', async (companyId, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  const url = companyId ? `/employees?companyId=${companyId}` : '/employees';

  try {
    const response = await api.get<Employee[]>(url);

    if (!response.data) {
      throw new Error('error');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error during fetching employees list');
  }
});
