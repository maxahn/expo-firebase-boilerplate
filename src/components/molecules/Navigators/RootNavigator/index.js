import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigationBar from './BottomNavigationBar';
import AuthNavigator from './AuthNavigator';
import { withAuthentication } from '../../../../services/Session';
import { Firebase } from '../../../../services/Firebase';

const RootNavigator = ({ authUser }) => (authUser ? <BottomNavigationBar /> : <AuthNavigator />);

RootNavigator.propTypes = {
  authUser: PropTypes.shape(Firebase.authUser),
};

RootNavigator.defaultProps = {
  authUser: null,
};

export default withAuthentication(RootNavigator);
