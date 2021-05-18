import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import routes from '../routes';
import PageTitle from '../components/PageTitle';

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

// Types to be entered in form
// also Data type when invalid
type FormData = {
  username?: string;
  password?: string;
};

// Data type when valid
type FieldError = {
  FormData: {
    type: 'minLength' | 'required';
    ref: HTMLInputElement;
    message: string;
  };
};

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

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmitValid = (data: FieldError): void => {
    console.log('data: ', data);
  };

  const onSubmitInvalid = (data: any): void => {
    console.log(data, 'invalid');
  };
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

        {/* handleSubmit의 첫번째 인자는 입력의 조건에 맞을때, 
        두번째 인자는 조건에 맞지 않는 입력값을 받았을때 */}
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: 5,
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register('password', {
              required: 'Password is required.',
            })}
            type="password"
            placeholder="Password"
          />
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
