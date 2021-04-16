import React from 'react';

const AuthUserContext = React.createContext(null);

// eslint-disable-next-line react/display-name
const withAuthentication = (Component) => (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export { AuthUserContext, withAuthentication };
