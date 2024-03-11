import { CompaniesSchema } from '@/features/company';
import { AxiosInstance } from 'axios';
import { EmployeesSchema } from '@/features/employee';

export interface StateSchema {
  companies: CompaniesSchema;
  employees: EmployeesSchema;
}

export interface ThunkExtraArgs {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArgs;
  rejectValue: T;
  state: StateSchema;
}
