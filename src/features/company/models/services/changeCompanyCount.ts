import { createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../types';
import { ThunkConfig } from '@/app/providers/store/config/stateSchema';
export const changeCompanyCount = createAsyncThunk<
  Company,
  Company & { count: number },
  ThunkConfig<string>
>(
  '@@employeesTable/changeEmployeeCount',
  async (companyWithCount, thunkApi) => {
    const {
      extra: { api },
      rejectWithValue,
    } = thunkApi;

    try {
      const response = await api.patch(`/companies/${companyWithCount.id}`, {
        employeeCount: companyWithCount.employeeCount + companyWithCount.count,
      });

      if (!response.data) {
        throw new Error('error');
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error adding employee');
    }
  },
);
