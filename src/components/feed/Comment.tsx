import { gql, useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

// deleteCommen의 트리거 생성
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

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

// 전달받는 Props
type Props = {
  id?: number;
  photoId?: number;
  isMine?: boolean;
  author: string;
  payload: string;
};

function Comment({ id, photoId, isMine, author, payload }: Props) {
  const updateDeleteComment = (cache: any, result: any) => {
    // deleteComment이후 반환 받은 return 값
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      // cache에 있는 comment를 찾아서 내쫓다(지움)
      cache.evict({ id: `Comment:${id}` });
      // comment를 cache에서 지운다음 photo의 commentNumber에서 1을 빼준값을 덮어씌움
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };

  // useMutation hook 생성
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    // mutation 작동 후 실행되는 부분
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    // useMutation hook 사용
    deleteCommentMutation();
  };
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
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
}

export default Comment;
