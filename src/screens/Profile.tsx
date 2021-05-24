import { useParams } from 'react-router-dom';

function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  return <div>'Profile'</div>;
}

export default Profile;
