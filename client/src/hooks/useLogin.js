import { useSelector, shallowEqual } from 'react-redux';

import { getUserToken } from 'redux/auth/authSelectors';

const useMail = () => {
  const isMail = useSelector(getUserToken, shallowEqual);
  return isMail;
};

export default useMail;
