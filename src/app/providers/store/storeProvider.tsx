import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from './config/stateSchema';
import { store } from './config/store';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
