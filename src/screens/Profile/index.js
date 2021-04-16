import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Text, Divider, Avatar, useStyleSheet, StyleService } from '@ui-kitten/components';
import { View } from 'react-native';
import { PROFILE } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import { withAuthentication } from '../../services/Session';
import { Firebase } from '../../services/Firebase';

const ProfilePic = require('../../../assets/default_profile_pic.jpg');

const themedStyles = StyleService.create({
  body: { flex: 1, alignItems: 'center' },
  profileContent: {
    flexDirection: 'row',
    backgroundColor: 'background-basic-color-2',
    alignSelf: 'stretch',
    padding: 20,
  },
  avatar: {
    marginRight: 20,
    marginTop: 8,
  },
});

const Profile = ({ authUser }) => {
  const styles = useStyleSheet(themedStyles);
  const { email, photoURL, displayName } = authUser;
  return (
    <>
      <Header isMenuVisible isBackVisible title={capitalize(PROFILE)} />
      <Divider />
      <Layout style={styles.body}>
        <View style={styles.profileContent}>
          <Avatar source={photoURL || ProfilePic} size="giant" style={styles.avatar} />
          <View>
            <Text category="h4">{displayName || 'No Name'}</Text>
            <Text category="h5">{email}</Text>
          </View>
        </View>
      </Layout>
    </>
  );
};

Profile.propTypes = {
  authUser: PropTypes.shape(Firebase.authUser).isRequired,
};

export default withAuthentication(Profile);
