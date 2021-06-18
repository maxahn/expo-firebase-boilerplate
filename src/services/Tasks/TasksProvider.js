import React from 'react';
import PropTypes from 'prop-types';
import { Firebase, withFirebase } from '../Firebase';
import { TasksContext } from './context';

const TasksProvider = ({ firebase, children }) => {
  const [tasks, setTasks] = React.useState([]);
  const [authId, setAuthId] = React.useState(null);

  React.useEffect(() => {
    const authListener = firebase.auth.onAuthStateChanged(({ uid }) => setAuthId(uid));
    const tasksListener = authId
      ? firebase.db
          .collection('users')
          .doc(authId)
          .collection('tasks')
          .onSnapshot(
            (querySnapshot) => {
              const updatedTasks = [];
              querySnapshot.forEach((taskDoc) => {
                updatedTasks.push({ uid: taskDoc.id, ...taskDoc.data() });
              });
              setTasks(updatedTasks);
            },
            (error) => {
              // eslint-disable-next-line no-console
              console.log({ error });
            },
          )
      : () => {};
    return () => {
      authListener();
      tasksListener();
    };
  }, [authId]);

  return <TasksContext.Provider value={tasks}>{children}</TasksContext.Provider>;
};

TasksProvider.propTypes = {
  firebase: PropTypes.instanceOf(Firebase),
  children: PropTypes.instanceOf(Object).isRequired,
};

TasksProvider.defaultProps = {
  firebase: null,
};

export default withFirebase(TasksProvider);
