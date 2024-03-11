import { createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
export const addCompany = createAsyncThunk<
  Company,
  Omit<Company, 'id'>,
  ThunkConfig<string>
>('@@companiesTable/addCompany', async (company, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const response = await api.post(`/companies`, company);

    if (!response.data) {
      throw new Error('error');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error adding company');
  }
});
