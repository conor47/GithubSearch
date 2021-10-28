import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const userContext = React.createContext();

const UserProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ show: false, msg: '' });

  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, hourly rate limit has been exceeded');
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleError = (show = false, msg = '') => {
    setErrors({ show, msg });
  };

  useEffect(checkRequests, []);

  return (
    <userContext.Provider
      value={{ githubUser, repos, followers, requests, errors }}
    >
      {children}
    </userContext.Provider>
  );
};

export { UserProvider, userContext };
