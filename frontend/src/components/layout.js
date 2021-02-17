import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 700px;
  margin: auto;
  position: relative;
`;

export default function Layout({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
