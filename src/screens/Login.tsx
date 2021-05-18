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
  username: string;
  password: string;
};

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>();
  const onSubmitValid = (data: FormData): void => {
    console.log('data: ', data);
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
            type="text"
            placeholder="Username"
          />
          {/* {errors.username && <p>{errors.username.message}</p>} */}
          <Input
            {...register('password', {
              required: 'Password is required.',
            })}
            type="password"
            placeholder="Password"
          />
          {/* {errors.password && <p>{errors.password.message}</p>} */}
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
