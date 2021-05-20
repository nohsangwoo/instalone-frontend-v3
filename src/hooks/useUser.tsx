import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../apollo';

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  // user가 로그인에 성공하지 못해서 token을 가지고 있지 않다면
  // me query를 건너 뛰게 설정해줌
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  // user가 token을 가지고 있다면 me query를 실행하고 결과값을 전달 받는다
  console.log(data);
  useEffect(() => {
    // data를 전달받은 상황에서 data.me의 값이 null이라면 logUserOut()을 실행한다
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return;
}
export default useUser;
