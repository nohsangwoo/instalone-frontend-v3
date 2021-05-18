import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import routes from '../routes';
import PageTitle from '../components/PageTitle';
// typescript 적용한 styled global theme 사용법

// import { isLoggedInVar } from '../apollo';

// type TitleStyleProps = {
//   potato: boolean;
// };
// const Title = styled.h1<TitleStyleProps>`
//   color: ${props => props.theme.fontColor};
// `;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = (): JSX.Element => {
  // typescript 적용 예시
  // const [username, setUsername] = useState('');
  // const [usernameError, setUsernameError] = useState('');
  // const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsernameError('');
  //   setUsername(event.target.value);
  // };
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (username === '') {
  //     setUsernameError('Not empty pls.');
  //   }
  //   if (username.length < 10) {
  //     setUsernameError('too short');
  //   }
  // };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        {/* <form onSubmit={handleSubmit}>
          {usernameError}
          <Input
            onChange={onUsernameChange}
            value={username}
            type="text"
            placeholder="Username"
          /> */}
        <form>
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          {/* <Button
            type="submit"
            value="Log in"
            disabled={username === '' && username.length < 10}
          /> */}
          <Button type="submit" value="Log in" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
