import styled from 'styled-components';

const ButtonComp = styled.button`
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

export default function Button({ onClick, children }) {
  return <ButtonComp onClick={onClick} >{children}</ButtonComp>;
}
