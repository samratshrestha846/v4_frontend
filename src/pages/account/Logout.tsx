// @flow
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// actions
import { logoutUser } from '../../redux/actions';
// components
import AccountLayout from './AccountLayout';
import logoutIcon from '../../assets/images/logout-icon.svg';

/* bottom link */
const BottomLink = () => {
  return (
    <footer className="footer footer-alt mt-4">
      <p className="text-muted ">
        {'Back to '}
        <Link to="/login" className="link-primary ms-1">
          Log In
        </Link>
      </p>
    </footer>
  );
};

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 800);
  }, [dispatch]);

  return (
    <AccountLayout bottomLinks={<BottomLink />}>
      <div className="text-center">
        <h4 className="mt-0">See You Again !</h4>
        <p className="text-muted mb-4">You have successfully signed out.</p>
      </div>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <img src={logoutIcon} height={58} alt="Logout" />
      </div>
    </AccountLayout>
  );
};

export default Logout;
