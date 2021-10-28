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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ show: false, msg: '' });

  const searchUser = async (user) => {
    toggleError();
    setIsLoading(true);
    try {
      const response = await axios.get(`${rootUrl}/users/${user}`);
      if (response) {
        setGithubUser(response.data);
        const { login, followers_url } = response.data;

        const repos = await axios.get(
          `${rootUrl}/users/${login}/repos?per_page=100`
        );
        setRepos(repos.data);

        console.log('repos', repos);

        const followers = await axios.get(`${followers_url}?per_page=100`);
        console.log('followers', followers);
        setFollowers(followers.data);
      } else {
        toggleError(true, 'user does not exist');
      }

      checkRequests();
      setIsLoading(false);
    } catch (err) {
      toggleError(true, 'user does not exist');
    }
  };

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
      value={{
        githubUser,
        repos,
        followers,
        requests,
        errors,
        searchUser,
        isLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export { UserProvider, userContext };
