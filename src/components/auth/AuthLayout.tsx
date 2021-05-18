import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
type Props = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Props) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

export default AuthLayout;
