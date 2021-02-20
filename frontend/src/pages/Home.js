import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Layout } from '@components';
import { Title } from '@styles';

export const Wrapper = styled.div`
  margin: 4rem auto;
  width: 100%;
`;

export const Divider = styled.hr`
  opacity: 0.5;
`;

const Subtitle = styled.p`
  font-family: Roboto;
  font-size: 20px;
`;

export const Button = styled.button`
  font-family: Roboto;
  font-weight: 300;
  font-size: 15px;
  background: #ff9e78;
  color: var(--background-color);
  border: none;
  border-radius: 3px;
  padding: 15px 20px 15px 20px;
  transition: 0.15s;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default function Home() {
  return (
    <Layout>
      <Wrapper>
        <Title>🦀 CrabMeet</Title>
        <Divider />
        <Subtitle>
          Time flies. Crabs don't.
        </Subtitle>
        <Link to="/make">
          <Button type="button">Make Meeting</Button>
        </Link>
      </Wrapper>
    </Layout>
  );
}
