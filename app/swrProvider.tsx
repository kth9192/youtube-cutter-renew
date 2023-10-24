'use client';
import { SWRConfig } from 'swr';

interface ProviderChild {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: ProviderChild) => {
  return <SWRConfig>{children}</SWRConfig>;
};
