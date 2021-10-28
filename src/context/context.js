import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const userContext = React.createContext();

const UserProvider = ({ children }) => {
  return (
    <userContext.Provider value={'hello!!!'}>{children}</userContext.Provider>
  );
};

export { UserProvider, userContext };
