import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Text, Divider, Avatar } from '@ui-kitten/components';
import { View } from 'react-native';
import { PROFILE } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import { withAuthentication } from '../../services/Session';
import { Firebase } from '../../services/Firebase';

const ProfilePic = require('../../../assets/default_profile_pic.jpg');

const Profile = ({ authUser }) => (
  <>
    <Header isMenuVisible isBackVisible title={capitalize(PROFILE)} />
    <Divider />
    <Layout style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'grey',
          alignSelf: 'stretch',
          padding: 20,
        }}
      >
        <Avatar source={ProfilePic} size="giant" />
        <Text category="h1">{authUser.email}</Text>
      </View>
    </Layout>
  </>
);

Profile.propTypes = {
  authUser: PropTypes.shape(Firebase.authUser).isRequired,
};

export default withAuthentication(Profile);
