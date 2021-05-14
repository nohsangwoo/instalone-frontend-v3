import { useState } from 'react';
import styled, { css } from 'styled-components';

// import { isLoggedInVar } from '../apollo';

type TitleStyleProps = {
  potato: boolean;
};
const Title = styled.h1<TitleStyleProps>`
  color: ${props => (props.potato ? 'palevioletred' : 'beige')};
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  ${props =>
    props.potato
      ? css`
          font-size: 49px;
        `
      : css`
          text-decoration: underline;
        `}
`;

const Container = styled.div`
  background-color: tomato;
`;

const TogglePotato = styled.button`
  color: red;
`;

function Login() {
  const [potato, setPotato] = useState(false);
  const togglePotato = () =>
    setPotato(current => {
      console.log('current확인: ', current);
      return !current;
    });
  return (
    <Container>
      <Title potato={potato}>Login</Title>
      <TogglePotato onClick={togglePotato}>Toggle Potato</TogglePotato>
    </Container>
  );
}

export default Login;
