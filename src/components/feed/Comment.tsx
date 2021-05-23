import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span<{
  theme: {
    accent: string;
  };
}>`
  margin-left: 10px;
  a {
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
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(' ').map((word, index) =>
          // 해당 정규표현 식이   맞는지 테스트후 true or false 로 반환한다.
          /#[\w]+/.test(word) ? (
            // true로 반환 받은 word인 경우
            // Link태그를 사용하여 해당 route로 이동하게 만들어주게 한다
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>
            </React.Fragment>
          ) : (
            // false로 반환 받은 word인 경우 아래의 조건으로 반환
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
