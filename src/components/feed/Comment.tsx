import styled from 'styled-components';
import { FatText } from '../shared';

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

type Props = {
  author: string;
  payload: string;
};

function Comment({ author, payload }: Props) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
