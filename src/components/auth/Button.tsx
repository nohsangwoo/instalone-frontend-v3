import styled from 'styled-components';

const Button = styled.input<{
  theme: {
    accent: string;
  };
}>`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${props => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
`;

export default Button;
