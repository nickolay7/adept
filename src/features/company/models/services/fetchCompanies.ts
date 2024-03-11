import { createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
export const fetchCompanies = createAsyncThunk<
  Company[],
  null,
  ThunkConfig<string>
>('@@companiesTable/fetchCompaniesList', async (args, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const response = await api.get<Company[]>('/companies');

    if (!response.data) {
      throw new Error('error');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error during fetching companies list');
  }
});
