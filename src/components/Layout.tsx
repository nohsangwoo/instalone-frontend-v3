import styled from 'styled-components';
import Header from './Header';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
