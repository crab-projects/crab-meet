import React from 'react';
import styled from 'styled-components';

export const TitleComp = styled.h1`
    font-size: 5rem;
`;

export default function Title({ children }) {
  return <TitleComp>{children}</TitleComp>;
}
