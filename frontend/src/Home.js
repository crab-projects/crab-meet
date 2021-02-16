import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: auto;
  width: 70%;

`;

export const H1 = styled.h1`
  font-family: Roboto;
  font-size: 50px;
  

`;

export const Hr = styled.hr`
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
  color: white;
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
      <Wrapper>
        <style>{`      
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
        `}</style>

        <H1>🦀CrabMeet</H1>
        <Hr/>
        <Subtitle>Get together and have a good time, crab-style: without the hassle.</Subtitle>
        <Link to="/make">
          <Button type="button">Make Meeting</Button>
        </Link>
      </Wrapper>
    );
  }