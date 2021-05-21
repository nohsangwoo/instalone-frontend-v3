import { gql, useMutation } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { FatText } from '../shared';
import { useEffect } from 'react';

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
  max-width: 615px;
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

type Props = {
  id: number;
  user: {
    username: string;
    avatar?: string;
  };
  file: string;
  caption: string;
  likes: number;
  comments?: string;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
};

function Photo({ id, user, file, isLiked, likes }: Props) {
  useEffect(() => {}, [user.username]);
  // cache: InMemoryCache 부분이랑 ,
  //   Backend에서 받아온 Result부분
  const updateToggleLike = (cache: any, result: any) => {
    console.log(cache, result);
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    // Mutation이 성공적으로 작동하여 제대로 데이터를 받아왔다면
    if (ok) {
      // cache에 저장된 어떤 데이터를 가져오고 싶을때(말그대로 readFragment)
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment BSName on Photo {
          isLiked
          likes
        }
      `;
      //   위 정보를 취합하여 실제로 cache에서 데이터를 불러와 result에 담아준다
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });

      // result안에 해당 인자가 존재한다면(안전장치)
      if ('isLiked' in result && 'likes' in result) {
        //   isLike와 likes에 각각 별명을 붙여주고
        const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
        // writeFragment를 진행하면서 불러온 데이터로 덮어씌워준다
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cacheIsLiked,
            likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
          },
        });
      }
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

  const tpggleLikeFunc = () => {
    toggleLikeMutation();
  };

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={tpggleLikeFunc}>
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
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
