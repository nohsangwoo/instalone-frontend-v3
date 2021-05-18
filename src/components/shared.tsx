import styled from 'styled-components';

type Props = {
  theme: {
    borderColor: string;
  };
};

export const BaseBox = styled.div<Props>`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;
