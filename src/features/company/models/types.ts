export type Company = {
  id: string;
  name: string;
  address: string;
  employeeCount: number;
};

export type CompaniesSchema = {
  isLoading: boolean;
  error?: string;
  data: Company[];
};
