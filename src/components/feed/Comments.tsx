import styled from 'styled-components';
import Comment from './Comment';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import useUser from '../../hooks/useUser';

// useMutation을 위한 트리거 생성
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
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

const PostCommentContainer = styled.div<{ theme: { borderColor: string } }>`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
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
  // 로그인에 성공한 상태인지 확인하는 작업
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();

  // cache: InMemoryCache 부분이랑 ,
  //   Backend에서 받아온 Result부분
  const createCommentUpdate = (cache: any, result: any) => {
    //   submit시 입력받은 payload변수값을 가져옴
    const { payload } = getValues();

    // 여기서 빈칸으로 초기화되는것은 payload를 식별자로 가진 input의 value임
    setValue('payload', '');

    // mutation을 실행하고 (성공했다면) 반환받은  return 값에서 ok와 id를 추출한다
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;

    // ok의 값이 있고, 로그인에 성공하여서 userData.me의 값이 존재한다면
    // 덮어씌우기 위한 form 생성
    if (ok && userData?.me) {
      const newComment = {
        __typename: 'Comment',
        createdAt: Date.now() + '',
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };

      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            # 덮어씌울 대상(필드)를 세팅
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });

      //  cache값을 수정(update)하기 위한 기능
      cache.modify({
        // 덮어씌우려는 대상(target)을 지정
        id: `Photo:${photoId}`,
        fields: {
          // 지정된 target안에서의 상세한 내용
          comments(prev: any) {
            //   cache에 저장된 기존값을 배열안에 spread해주고 덮어씌워줄 내용인 newCommnet를 덮어씌운다
            return [...prev, newCacheComment];
          },
          commentNumber(prev: number) {
            // cache에 저장된 commentNumber의 기존값에 +1 하여 덮어씌운다
            return prev + 1;
          },
        },
      });
    }
  };
  // mutation hook 생성
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  //  form 에서 submit시에 전달 하려는 props의 값들
  const onValid = (data: { payload: string }) => {
    const { payload } = data;
    // useMutation 실행중 중복 클릭을 방지하기위한 안전장치
    if (loading) {
      return;
    }
    // mutation hook을 실질적으로 실행하는 위치
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      {/* feed주인의 comment */}
      <Comment author={author} payload={caption} />
      {/* 나머지 comments 갯수 */}
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {/* commnets를 표현 */}
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment.user.username}
          payload={comment.payload}
          isMine={comment.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register('payload', { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

export default Comments;
