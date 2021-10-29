import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img4.svg';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github user" />
        <button className="btn" onClick={loginWithRedirect}>
          Login
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: white;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  button {
    font-size: 1.5rem;
    color: white;
    transition: all 0.3s ease-in;
  }
  button:hover {
    color: #c025ff;
  }
  img {
    margin-bottom: 2rem;
    color: white;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
