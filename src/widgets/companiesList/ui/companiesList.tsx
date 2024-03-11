import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/providers/store';
import { fetchCompanies, CompanyTable, Company } from '@/features/company';
import { EmployeesTable } from '@/features/employee';

import styles from './styles.module.scss';

export const CompaniesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);

  const [selectedAllCompanies, setSelectedAllCompanies] =
    useState<boolean>(false);

  const handleSelectCompany = useCallback(
    (id: string) => {
      if (selectedCompanyIds.includes(id)) {
        setSelectedCompanyIds((prev) => prev.filter((item) => item !== id));
      } else {
        setSelectedCompanyIds((prev) => [...prev, id]);
      }
      setSelectedAllCompanies(false);
    },
    [selectedCompanyIds],
  );

  const handleSelectAllCompanies = useCallback(
    (companies: Company[]) => {
      if (!selectedAllCompanies) {
        const allCompaniesIds = companies.map((company) => company.id);
        setSelectedCompanyIds(allCompaniesIds);
        setSelectedAllCompanies(true);
      } else {
        setSelectedCompanyIds([]);
        setSelectedAllCompanies(false);
      }
    },
    [selectedAllCompanies],
  );

  const handleCleanCompaniesIds = (): void => setSelectedCompanyIds([]);

  useEffect(() => {
    dispatch(fetchCompanies(null));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <CompanyTable
        onSelectCompany={handleSelectCompany}
        selectedCompanyIds={selectedCompanyIds}
        selectedAllCompanies={selectedAllCompanies}
        onSelectAllCompanies={handleSelectAllCompanies}
        onCleanCompaniesIds={handleCleanCompaniesIds}
      />
      {selectedCompanyIds.length === 1 && (
        <EmployeesTable companyId={selectedCompanyIds[0]} />
      )}
      {selectedAllCompanies && <EmployeesTable />}
    </div>
  );
};
