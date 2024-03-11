export type Employee = {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  position: string;
};

export type EmployeesSchema = {
  isLoading: boolean;
  error?: string;
  data: Employee[];
};
