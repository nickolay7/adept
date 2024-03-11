import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
import { AxiosResponse } from 'axios';
import { Company } from '@/features/company';
export const deleteCompanies = createAsyncThunk<
  string[],
  string[],
  ThunkConfig<string>
>('@@companiesTable/deleteCompanies', async (companyIds, thunkApi) => {
  const {
    extra: { api },
    rejectWithValue,
  } = thunkApi;

  try {
    const deletePromises: Promise<AxiosResponse<Company>>[] = companyIds.map(
      (companyId) => api.delete(`/companies/${companyId}`),
    );

    const response: AxiosResponse<Company>[] = await Promise.all(
      deletePromises,
    );

    if (!response.every((r) => r.status === 200)) {
      throw new Error('error');
    }

    return response.map((r) => r.data.id);
  } catch (e) {
    return rejectWithValue('error deleting company');
  }
});
