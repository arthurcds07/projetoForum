import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogado, setUserLogado] = useState(null);

  return (
    <UserContext.Provider value={{ userLogado, setUserLogado }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);