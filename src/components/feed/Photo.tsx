import { gql, useMutation } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { FatText } from '../shared';
import { useEffect } from 'react';
import Comments from './Comments';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 60px;
  min-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
  min-height: 50vh;
  max-height: 50vh;
  object-fit: cover;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

// const Comments = styled.div`
//   margin-top: 20px;
// `;
// const Comment = styled.div``;
// const CommentCaption = styled.span`
//   margin-left: 10px;
// `;

// const CommentCount = styled.span`
//   opacity: 0.7;
//   margin: 10px 0px;
//   display: block;
//   font-weight: 600;
//   font-size: 10px;
// `;

type Props = {
  id: number;
  user: {
    username: string;
    avatar?: string;
  };
  file: string;
  caption: string;
  likes: number;
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
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
};

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: Props): JSX.Element {
  useEffect(() => {}, [user.username]);
  // cache: InMemoryCache 부분이랑 ,
  //   Backend에서 받아온 Result부분
  const updateToggleLike = (cache: any, result: any) => {
    // console.log(cache, result);
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    // Mutation이 성공적으로 작동하여 제대로 데이터를 받아왔다면
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation, { loading }] = useMutation<
    //   트리거에서 전달 받는 인자
    { toggleLike: { id: number } },
    // hooks에서(여기서) 전달 하는 인자
    { id: number }
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },

    update: updateToggleLike,
  });

  console.log('loading', loading);

  const toggleLikeFunc = () => {
    toggleLikeMutation();
  };

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar lg url={user.avatar} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeFunc}>
              <FontAwesomeIcon
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
