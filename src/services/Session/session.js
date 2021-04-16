import React from 'react';
import PropTypes from 'prop-types';
import { Firebase, withFirebase } from '../Firebase';
import { AuthUserContext } from './context';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.listener = firebase.auth.onAuthStateChanged((authUser) =>
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null }),
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;
    const { children } = this.props;
    return <AuthUserContext.Provider value={authUser}>{children}</AuthUserContext.Provider>;
  }
}

Session.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default withFirebase(Session);
