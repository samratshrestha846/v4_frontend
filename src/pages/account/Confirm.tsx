// @flow
import React from 'react';
import { Link } from 'react-router-dom';

// components
import AccountLayout from './AccountLayout';

import mailSent from '../../assets/images/mail_sent.svg';

const Confirm = ({ email }: { email: string }) => {
  return (
    <AccountLayout>
      <div className="text-center m-auto">
        <img src={mailSent} alt="mail sent" height="64" />
        <h4 className="text-dark-50 text-center mt-4 fw-bold">
          Please check your email
        </h4>
        <p className="text-muted mb-4">
          A email has been send to <b>{email}</b>. Please check for an email and
          click on the included link to reset your password.
        </p>
        <form>
          <div className="mb-0 d-grid text-center">
            <Link to="/login" className="btn btn-secondary">
              <i className="bx bx-home me-1" /> Back to Login
            </Link>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

export default Confirm;
