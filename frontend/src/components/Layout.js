import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@styles';

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 8rem;
  // position: relative;
  display: flex;
  flex-direction: column;
`;

export default function Layout({ children }) {
  return (
    <>
    <GlobalStyle />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
