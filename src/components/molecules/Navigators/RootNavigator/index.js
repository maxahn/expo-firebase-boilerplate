import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BottomNavigationBar from '../../BottomNavigationBar';
import AuthNavigator from '../AuthNavigator';
import { withFirebase, Firebase } from '../../../../services/Firebase';

class RootNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth.onAuthStateChanged((authUser) =>
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null }),
    );
  }

  render() {
    const { authUser } = this.state;
    return authUser ? <BottomNavigationBar /> : <AuthNavigator />;
  }
}

RootNavigator.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(RootNavigator);
