// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import CompaniesPage from '@/pages/companies/companiesPage';
import { StoreProvider } from '@/app/providers/store';

export function App() {
  return (
    <StoreProvider>
      <CompaniesPage />
    </StoreProvider>
  );
}

export default App;
