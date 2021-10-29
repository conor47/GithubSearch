import React from 'react';
import { userContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus, FiUser } from 'react-icons/fi';

const UserInfo = () => {
  const { githubUser } = React.useContext(userContext);
  const { public_repos, followers, following, public_gists } = githubUser;

  const items = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      label: 'repos',
      value: public_repos,
      color: 'pink',
    },
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      label: 'followers',
      value: followers,
      color: 'green',
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      label: 'following',
      value: following,
      color: 'purple',
    },
    {
      id: 4,
      icon: <GoGist className="icon" />,
      label: 'gists',
      value: public_gists,
      color: 'yellow',
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        {items.map((item) => {
          return <Item key={item.id} {...item}></Item>;
        })}
      </Wrapper>
    </section>
  );
};

const Item = ({ icon, label, value, color }) => {
  return (
    <article className="item">
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    align-items: center;
    justify-items: center;
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    align-items: center;
  }

  .item {
    border-radius: var(--radius);
    color: white;
    padding: 1rem 2rem;
    background: #040306;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1.5rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      color: white;
      opacity: 0.6;
      text-transform: capitalize;
    }
    .pink {
      background: #040306;
      color: #da4a91;
    }
    .green {
      background: #040306;
      color: var(--clr-primary-5);
    }
    .purple {
      background: #040306;
      color: #5d55fa;
    }
    .yellow {
      background: #040306;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
