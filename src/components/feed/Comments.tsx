import styled from 'styled-components';
import Comment from './Comment';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

// useMutation을 위한 트리거 생성
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

type Props = {
  photoId: number;
  author: string;
  caption: string;
  commentNumber?: number;
  comments: {
    id: number;
    user: {
      username: string;
      avatar: string;
    };
    payload: string;
    isMine: boolean;
    createdAt: string;
  }[];
};

function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: Props) {
  // mutation hook 생성
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );
  const { register, handleSubmit, setValue } = useForm();
  //  form 에서 submit시에 전달 하려는 props의 값들
  const onValid = (data: { payload: string }) => {
    const { payload } = data;
    // useMutation 실행중 중복 클릭을 방지하기위한 안전장치
    if (loading) {
      return;
    }
    // mutatio hook을 실질적으로 실행하는 위치
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
    setValue('payload', '');
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register('payload', { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
