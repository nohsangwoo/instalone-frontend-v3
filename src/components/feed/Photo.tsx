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
  const [toggleLikeMutation, { loading }] = useMutation<
    //   트리거에서 전달 받는 인자
    { toggleLike: { id: number } },
    // hooks에서(여기서) 전달 하는 인자
    { id: number }
  >(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
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
