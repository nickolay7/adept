import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompaniesSchema, Company } from './types';
import { fetchCompanies } from './services/fetchCompanies';
import { editCompany } from './services/editCompany';
import { addCompany } from './services/addCompany';
import { deleteCompanies } from './services/deleteCompanies';
import { changeCompanyCount } from './services/changeCompanyCount';

const initialState: CompaniesSchema = {
  isLoading: false,
  error: '',
  data: [] as Company[],
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editCompany.pending, (state, action) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(
        editCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.isLoading = false;
          const updatedCompany = action.payload;
          state.data = state.data.map((company) =>
            company.id === updatedCompany.id ? updatedCompany : company,
          );
        },
      )
      .addCase(editCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(
        addCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.data.push(action.payload);
        },
      )
      .addCase(
        deleteCompanies.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          const companyIds = action.payload;
          state.data = state.data.filter(
            (company) => !companyIds.includes(company.id),
          );
        },
      )
      .addCase(
        changeCompanyCount.fulfilled,
        (state, action: PayloadAction<Company>) => {
          const changedCompany = action.payload;
          state.data = state.data.map((company) => {
            return company.id === changedCompany.id ? changedCompany : company;
          });
        },
      );
  },
});
export const companiesReducer = companiesSlice.reducer;
