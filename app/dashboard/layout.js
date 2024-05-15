import React from 'react';

import Dashboard from '@/components/hoc/dashboard';

export default function RootLayout({ children }) {
  return <Dashboard>{children}</Dashboard>;
}
