import { gql, useQuery } from '@apollo/client';

import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';

// 나를 follow하는 모든 user의 feed와 && 나의 feed를 전부 로드하여 불러온다
// 위 내용의 트리거
const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home(): JSX.Element {
  // 피드를 불러온다.
  const { data } = useQuery(FEED_QUERY);

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
    comments?: string;
    createdAt: string;
    isMine: boolean;
    isLiked: boolean;
  };
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: returnValue) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}

export default Home;
