import React from 'react';
import { Layout, Text, Divider } from '@ui-kitten/components';
import { PROFILE } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';

const Profile = () => (
  <>
    <Header isMenuVisible isBackVisible title={capitalize(PROFILE)} />
    <Divider />
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">PROFILE</Text>
    </Layout>
  </>
);

export default Profile;
