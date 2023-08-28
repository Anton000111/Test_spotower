'use client'
import { UserProvider } from './User';
export * from './User';

const Providers = ({ children }) => (
  <UserProvider>
    {children}
  </UserProvider>
);

export default Providers;

