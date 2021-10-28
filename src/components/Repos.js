import React from 'react';
import styled from 'styled-components';
import { userContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(userContext);

  // aggregating the languages used accross the repos
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!(language in total))
      total[language] = { label: language, value: 1, stars: stargazers_count };
    else {
      total[language].value += 1;
      total[language].stars += stargazers_count;
    }
    return total;
  }, {});

  console.log(languages);

  // most popular languages

  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // most stars per language

  const mostStars = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  const chartData = [
    { label: 'html', value: 20 },
    { label: 'css', value: 35 },
    { label: 'javascript', value: 50 },
    { label: 'python', value: 26 },
    { label: 'sql', value: 78 },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <div>
          <Doughnut2D data={mostStars} />
        </div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
