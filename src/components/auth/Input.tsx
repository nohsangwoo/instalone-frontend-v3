import styled from 'styled-components';

const SInput = styled.input<{
  theme: {
    borderColor: string;
  };
}>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${props => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type: string;
  placeholder?: string;
};

const Input = (props: Props): JSX.Element => {
  return <SInput {...props} />;
};
export default Input;
