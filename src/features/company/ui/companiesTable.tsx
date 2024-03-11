import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import { Company } from '@/features/company';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import classnames from 'classnames';
import { editCompany, addCompany, deleteCompanies } from '@/features/company';

import styles from './styles.module.scss';

interface CompanyTableProps {
  onSelectCompany: (ids: string) => void;
  onSelectAllCompanies: (companies: Company[]) => void;
  selectedAllCompanies: boolean;
  selectedCompanyIds: string[];
  onCleanCompaniesIds: () => void;
}

export const CompanyTable: React.FC<CompanyTableProps> = React.memo(
  ({
    onSelectCompany,
    selectedCompanyIds,
    onSelectAllCompanies,
    selectedAllCompanies,
    onCleanCompaniesIds,
  }) => {
    const companies = useAppSelector((state) => state.companies);
    const dispatch = useAppDispatch();

    const [editingCompanyId, setEditingCompanyId] = useState<string | null>(
      null,
    );
    const [editingCompanyData, setEditingCompanyData] =
      useState<Company | null>(null);

    const onEdit = (company: Company) => {
      setEditingCompanyId(company.id);
      setEditingCompanyData(company);
    };

    const onSave = () => {
      editingCompanyData && dispatch(editCompany(editingCompanyData));
      setEditingCompanyId(null);
      setEditingCompanyData(null);
    };

    const onCancel = () => {
      setEditingCompanyId(null);
      setEditingCompanyData(null);
    };

    const onAddCompany = () => {
      const newCompany: Omit<Company, 'id'> = {
        name: faker.company.name(),
        address: faker.location.streetAddress(false),
        employeeCount: faker.number.int({ min: 10, max: 500 }),
      };
      dispatch(addCompany(newCompany));
    };

    const onDeleteCompanies = (ids: string[]) => {
      dispatch(deleteCompanies(ids));
      onCleanCompaniesIds();
    };

    if (!companies.data.length) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Компании</h3>
        <button onClick={onAddCompany}>Добавить компанию</button>{' '}
        <button onClick={() => onDeleteCompanies(selectedCompanyIds)}>
          Удалить выбранные компании
        </button>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedAllCompanies}
                  onChange={() => onSelectAllCompanies(companies.data)}
                />
              </th>
              <th>Название компании</th>
              <th>Кол-во сотрудников</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {companies.data.map((company) => (
              <tr
                key={company.id}
                className={classnames({
                  [styles.highlight]:
                    selectedCompanyIds.includes(company.id) ||
                    selectedAllCompanies,
                })}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={
                      selectedCompanyIds.includes(company.id) ||
                      selectedAllCompanies
                    }
                    onChange={() => {
                      onSelectCompany(company.id);
                    }}
                  />
                </td>
                {editingCompanyId === company.id ? (
                  <>
                    <td>
                      <input
                        value={editingCompanyData?.name || ''}
                        onChange={(e) =>
                          setEditingCompanyData({
                            ...company,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>{company.employeeCount}</td>
                    <td>
                      <input
                        value={editingCompanyData?.address || ''}
                        onChange={(e) =>
                          setEditingCompanyData({
                            ...company,
                            address: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => onSave()}>Save</button>{' '}
                      <button onClick={onCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td onClick={() => onEdit(company)}>{company.name}</td>
                    <td>{company.employeeCount}</td>
                    <td onClick={() => onEdit(company)}>{company.address}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
