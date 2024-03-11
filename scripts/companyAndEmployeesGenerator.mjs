import { faker } from '@faker-js/faker';
import fs from 'fs';

// get random array element
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Генерация случайных данных для компаний
const generateCompanies = (count) => {
  const companies = [];
  for (let i = 0; i < count; i++) {
    companies.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      address: faker.location.streetAddress(false),
      employeeCount: faker.number.int({ min: 10, max: 500 }),
    });
  }
  return companies;
};

// Генерация случайных данных для сотрудников
const generateEmployees = (count, companies) => {
  const employees = [];
  for (let i = 0; i < count; i++) {
    const company = getRandomElement(companies);
    employees.push({
      id: faker.string.uuid(),
      companyId: company.id,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      position: faker.person.jobTitle(),
    });
  }
  return employees;
};

// Генерация данных
const companies = generateCompanies(10); // Генерируем 10 компаний
const employees = generateEmployees(50, companies); // Генерируем 50 сотрудников

// Формируем объект для записи в файл
const db = {
  companies,
  employees,
};

// Записываем данные в файл db.json
fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

console.log('Файл db.json успешно создан с фейковыми данными.');
