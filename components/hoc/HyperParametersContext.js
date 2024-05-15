'use client';
import { defaultParameters } from '@/hooks/hyperParameter';
import { createContext, useState } from 'react';
export const HyperParametersContext = createContext(null);

const HyperParametersProvider = ({ children }) => {
  const [values, setValues] = useState(defaultParameters);
  const updateValues = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <HyperParametersContext.Provider value={{ values, updateValues }}>
      {children}
    </HyperParametersContext.Provider>
  );
};

export default HyperParametersProvider;
