import React from 'react';

const FirebaseContext = React.createContext(null);

// eslint-disable-next-line react/display-name
const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export { FirebaseContext, withFirebase };
