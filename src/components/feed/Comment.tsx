import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FatText } from '../shared';

const CommentContainer = styled.div``;
const CommentCaption = styled.span<{
  theme: {
    accent: string;
  };
}>`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

type Props = {
  author: string;
  payload: string;
};

function Comment({ author, payload }: Props) {
  // allowedTags로 허용한 tag만 기능으로 인식하게 만들어줌
  //   (여기선 mark태그만 허용한것 )
  // 그외 tag는 string으로 표현됨(사용자의 공격으로부터 보호함)
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[\w]+/g, '<mark>$&</mark>'),
    {
      allowedTags: ['mark'],
    }
  );
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
}

export default Comment;
