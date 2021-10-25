import React from 'react';
import Page from 'components/Page';
import Form from './Form';
import { clearUser } from '../../../store/ducks/User';

const Profile = () => {
  return (
    <Page>
      <Form />
    </Page>
  );
};

export default Profile;
