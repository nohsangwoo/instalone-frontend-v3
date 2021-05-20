import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { logUserOut } from '../apollo';

import Avatar from '../components/Avatar';
import { FatText } from '../components/shared';

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
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

function Home(): JSX.Element {
  // 피드를 불러온다.
  const { data } = useQuery(FEED_QUERY);

  // for seeFeed's typescript
  type returnValue = {
    id: string;
    user: {
      username: string;
      avatar: string;
    };
    file: string;
    caption: string;
    likes: string;
    comments?: string;
    createdAt: string;
    isMine: boolean;
  };
  return (
    <div>
      {data?.seeFeed?.map((photo: returnValue) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
    </div>
  );
}

export default Home;
