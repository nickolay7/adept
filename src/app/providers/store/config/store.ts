import { configureStore } from '@reduxjs/toolkit';
import { companiesReducer } from '@/features/company';
import { employeesReducer } from '@/features/employee';
import { $api } from '@/shared/api/api';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    employees: employeesReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
