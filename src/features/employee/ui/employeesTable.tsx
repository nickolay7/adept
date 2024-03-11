import React, { useCallback, useEffect, useState } from 'react';
import { Employee } from '../models/types';
import { useAppDispatch, useAppSelector } from '@/app/providers/store';
import classnames from 'classnames';
import {
  addEmployee,
  fetchEmployees,
  editEmployee,
  deleteEmployees,
} from '@/features/employee';
import { faker } from '@faker-js/faker';
import { changeCompanyCount } from '@/features/company/models/services/changeCompanyCount';
import { Company } from '@/features/company';

import styles from './styles.module.scss';

interface EmployeesTableProps {
  companyId?: string;
}
// for random companyId generating
function getRandomElement(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  companyId,
}) => {
  const employees = useAppSelector((state) => state.employees);
  const companies = useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const [selectedAllEmployees, setSelectedAllEmployees] =
    useState<boolean>(false);

  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null,
  );
  const [editingEmployeeData, setEditingEmployeeData] =
    useState<Employee | null>(null);

  const onSelectEmployee = useCallback(
    (id: string) => {
      if (selectedEmployeeIds.includes(id)) {
        setSelectedEmployeeIds((prev) => prev.filter((item) => item !== id));
      } else {
        setSelectedEmployeeIds((prev) => [...prev, id]);
      }
      setSelectedAllEmployees(false);
    },
    [selectedEmployeeIds],
  );

  const onSelectAllEmployees = useCallback(
    (employees: Employee[]) => {
      if (!selectedAllEmployees) {
        const allEmployeesIds = employees.map((employee) => employee.id);
        setSelectedEmployeeIds(allEmployeesIds);
        setSelectedAllEmployees(true);
      } else {
        setSelectedEmployeeIds([]);
        setSelectedAllEmployees(false);
      }
    },
    [selectedAllEmployees],
  );

  const onCleanEmployeesIds = (): void => setSelectedEmployeeIds([]);

  const onEdit = (employee: Employee) => {
    setEditingEmployeeId(employee.id);
    setEditingEmployeeData(employee);
  };

  const onSave = () => {
    editingEmployeeData && dispatch(editEmployee(editingEmployeeData));
    setEditingEmployeeId(null);
    setEditingEmployeeData(null);
  };

  const onCancel = () => {
    setEditingEmployeeId(null);
    setEditingEmployeeData(null);
  };

  const onAddEmployee = () => {
    const companiesIds = employees.data.map((employee) => employee.companyId);
    const randomCompanyId = getRandomElement(companiesIds);
    const changedCompany = companies.data.find(
      (company) => company.id === randomCompanyId,
    ) as Company;

    const newEmployee: Omit<Employee, 'id'> = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      companyId: randomCompanyId,
      position: faker.person.jobTitle(),
    };
    dispatch(addEmployee(newEmployee));
    dispatch(changeCompanyCount({ ...changedCompany, count: 1 }));
  };

  const onDeleteEmployees = (ids: string[]) => {
    const employeeById = employees.data.find(
      (employee) => employee.id === ids[0],
    ) as Employee;

    const changedCompany = companies.data.find(
      (company) => company.id === employeeById.companyId,
    ) as Company;

    dispatch(deleteEmployees(ids));

    dispatch(changeCompanyCount({ ...changedCompany, count: -ids.length }));

    onCleanEmployeesIds();
  };

  useEffect(() => {
    dispatch(fetchEmployees(companyId));
  }, [dispatch, companyId]);

  if (!employees.data.length) {
    return <div>Работников не найдено!</div>;
  }

  return (
    <div>
      <h3>Сотрудники</h3>
      <button onClick={onAddEmployee}>Добавить сотрудника</button>{' '}
      <button onClick={() => onDeleteEmployees(selectedEmployeeIds)}>
        Удалить выбранных сотрудников
      </button>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedAllEmployees}
                onChange={() => onSelectAllEmployees(employees.data)}
              />
            </th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Должность</th>
          </tr>
        </thead>
        <tbody>
          {employees.data.map((employee) => (
            <tr
              key={employee.id}
              className={classnames({
                [styles.highlight]:
                  selectedEmployeeIds.includes(employee.id) ||
                  selectedAllEmployees,
              })}
            >
              <td>
                <input
                  type="checkbox"
                  checked={
                    selectedEmployeeIds.includes(employee.id) ||
                    selectedAllEmployees
                  }
                  onChange={() => onSelectEmployee(employee.id)}
                />
              </td>
              {editingEmployeeId === employee.id ? (
                <>
                  <td>
                    <input
                      value={editingEmployeeData?.firstName || ''}
                      onChange={(e) =>
                        setEditingEmployeeData({
                          ...employee,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingEmployeeData?.lastName || ''}
                      onChange={(e) =>
                        setEditingEmployeeData({
                          ...employee,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingEmployeeData?.position || ''}
                      onChange={(e) =>
                        setEditingEmployeeData({
                          ...employee,
                          position: e.target.value,
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
                  <td onClick={() => onEdit(employee)}>{employee.firstName}</td>
                  <td onClick={() => onEdit(employee)}>{employee.lastName}</td>
                  <td onClick={() => onEdit(employee)}>{employee.position}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
