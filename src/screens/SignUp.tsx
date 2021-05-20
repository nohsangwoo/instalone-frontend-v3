import { gql, useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import PageTitle from '../components/PageTitle';
import { FatLink } from '../components/shared';
import routes from '../routes';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

// 사용하기위한 트리거 생성
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

function SingUp(): JSX.Element {
  const history = useHistory();

  // mutation실행 후 실행되는 함수
  const onCompleted = (data: {
    // react hook form 에서 submit 한 후 순간 입력된 값에서 추출
    createAccount: { ok: string; error: string };
  }) => {
    const { username, password } = getValues();

    const {
      // createAccount: { ok, error },
      createAccount: { ok },
    } = data;
    // console.log(error);
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: 'Account created. Please log in.',
      username,
      password,
    });
  };

  // mutation apollo hook 생성
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    // mutation실행 후 실행되는 함수
    onCompleted,
  });

  // useForm을 사용하기위한 세팅
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  // react hooks form에서 submit됐을때 실행되는 함수
  const onSubmitValid = (data: FormData) => {
    if (loading) {
      return;
    }
    // 만들어진 apollo mutation hooks에 변수를 전달하면서 사용하는 방법
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        {/* form의 Onsubmit을 react hooks form의 handleSubmit 과 연결해줌으로 이제 hooks form 사용설정됨*/}
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('firstName', {
              required: 'First Name is required.',
            })}
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register('lastName')}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register('email', {
              required: 'Email is required.',
            })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register('username', {
              required: 'Username is required.',
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
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Sign up'}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;
