import styled from 'styled-components';

// import { isLoggedInVar } from '../apollo';

// type TitleStyleProps = {
//   potato: boolean;
// };
// const Title = styled.h1<TitleStyleProps>`
//   color: ${props => props.theme.fontColor};
// `;
const Title = styled.h1`
  color: ${props => props.theme.fontColor};
`;

const Container = styled.div``;

function Login() {
  return (
    <Container>
      <Title>Login</Title>
    </Container>
  );
}

export default Login;
