import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/auth/Button';
import PageTitle from '../components/PageTitle';
import { FatText } from '../components/shared';
import { PHOTO_FRAGMENT } from '../fragments';
// import useUser, { ME_QUERY } from '../hooks/useUser';
import useUser from '../hooks/useUser';

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg: string }>`
  background-image: url(${props => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: 'span',
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const { data: userData } = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const unfollowUserUpdate = (cache: any, result: any) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev: boolean) {
          return false;
        },
        totalFollowers(prev: number) {
          return prev - 1;
        },
      },
    });
    const { me } = userData;
    // 내가 follow 한 상대의 cache에서 follower부분을 변경했다면
    // 나의 following의 cache부분도 변경해주는것
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev - 1;
        },
      },
    });
  };

  // unfollowUser mutation hook생성
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unfollowUserUpdate,
  });

  const followUserCompleted = (data: any) => {
    // onComplete는 mutation이 완료후 반환한 data만 반환한다.
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }

    // cache에 접근하는 방법
    // 이렇게 사용하면 어디서든 접근가능
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev: boolean) {
          return true;
        },
        totalFollowers(prev: number) {
          return prev + 1;
        },
      },
    });
    const { me } = userData;
    // 내가 follow 한 상대의 cache에서 follower부분을 변경했다면
    // 나의 following의 cache부분도 변경해주는것
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev + 1;
        },
      },
    });
  };

  // mutation hook생성
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });

  const getButton = (seeProfile: {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    avatar: string;
    totalFollowing: number;
    totalFollowers: number;
    isMe: boolean;
    isFollowing: boolean;
    photos: {
      id: number;
      file: string;
      likes: number;
      commentNumber: number;
      isLiked: boolean;
    };
  }) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return <ProfileBtn onClick={() => unfollowUser()}>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={() => followUser()}>Follow</ProfileBtn>;
    }
  };

  return (
    <div>
      <PageTitle
        title={
          loading ? 'Loading...' : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {'  '}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map(
          (photo: {
            id: number;
            file: string;
            likes: number;
            commentNumber: number;
            isLiked: boolean;
          }) => (
            <Photo key={photo.id} bg={photo.file}>
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {photo.likes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {photo.commentNumber}
                </Icon>
              </Icons>
            </Photo>
          )
        )}
      </Grid>
    </div>
  );
}

export default Profile;
