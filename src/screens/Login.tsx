import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';
import styled from 'styled-components';
import { logUserIn } from '../apollo';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
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
  username: string;
  password: string;
};

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = (): JSX.Element => {
  const location =
    useLocation<
      Location & { username: string; password: string; message: string }
    >();
  console.log(location?.state);

  //useForm 사용법
  const {
    register,
    handleSubmit,
    // formState: { isValid },
    formState: { errors, isValid },
    getValues,
    // setError,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  // useEffect(() => {}, [errorMessage, setErrorMessage]);

  const onCompleted = (data: {
    login: { ok: string; error: string; token: string }; // for typescript
  }) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setErrorMessage(error);
    }
    // 만약 토큰이 존재하면 logUserIn에 toke값을 넘겨주고 로그인 성공 절차를 진행한다.
    if (token) {
      logUserIn(token);
    }
  };

  // apollo mutation hook생성
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    // mutation작업이 성공했다면 실행하는 함수
    onCompleted,
  });

  const onSubmitValid = (data: FormData): void => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    // apollo mutation hook 사용방법
    login({
      variables: { username, password },
    });
  };

  const onSubmitInvalid = (data: Record<string, any>): void => {
    console.log(data, 'invalid');
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>

        {/* handleSubmit의 첫번째 인자는 입력의 조건에 맞을때, 
        두번째 인자는 조건에 맞지 않는 입력값을 받았을때 */}
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 4,
                message: 'You must enter at least 4 characters',
              },
            })}
            // onChange={clearLoginError}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register('password', {
              required: 'Password is required.',
            })}
            // onChange={clearLoginError}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Log in'}
            disabled={!isValid || loading}
          />
          <FormError message={errorMessage} />
          <FormError message={errors?.username?.message} />
          <FormError message={errors?.password?.message} />
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
