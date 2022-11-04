import { useSelector, shallowEqual } from 'react-redux';

import { getUserEmail } from 'redux/auth/authSelectors';

const useMail = () => {
  const isMail = useSelector(getUserEmail, shallowEqual);
  return isMail;
};

export default useMail;
