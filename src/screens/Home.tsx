import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 나를 follow하는 모든 user의 feed와 && 나의 feed를 전부 로드하여 불러온다
// 위 내용의 트리거
const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home(): JSX.Element {
  // 피드를 불러온다.
  const { data } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  // for seeFeed's typescript
  type returnValue = {
    id: number;
    user: {
      username: string;
      avatar: string;
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

  console.log('feed: ', data);
  return (
    <HomeContainer>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: returnValue) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </HomeContainer>
  );
}

export default Home;
