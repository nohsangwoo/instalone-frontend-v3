import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

const CommentContainer = styled.div``;
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
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
