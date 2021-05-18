import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const SBottomBox = styled(BaseBox)<{
  theme: {
    accent: string;
  };
}>`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${props => props.theme.accent};
  }
`;

type Props = {
  cta: string;
  link: string;
  linkText: string;
};

function BottomBox({ cta, link, linkText }: Props): JSX.Element {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
}

export default BottomBox;
