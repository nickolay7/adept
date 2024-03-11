import { createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
export const editCompany = createAsyncThunk<
  Company,
  Company,
  ThunkConfig<string>
>('@@companiesTable/editCompany', async (company, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const response = await api.patch(`/companies/${company.id}`, company);

    if (!response.data) {
      throw new Error('error');
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error editing company');
  }
});
