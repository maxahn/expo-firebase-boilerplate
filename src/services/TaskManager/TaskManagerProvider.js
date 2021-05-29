import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TaskManagerContext } from './context';
import TaskManager from './TaskManager';
import { Firebase, withFirebase } from '../Firebase';

const TaskManagerProvider = ({ firebase, children }) => {
  const [taskManager, setTaskManager] = useState(null);

  useEffect(() => {
    if (!taskManager) {
      setTaskManager(new TaskManager(firebase));
    }
  });

  return <TaskManagerContext.Provider value={taskManager}>{children}</TaskManagerContext.Provider>;
};

TaskManagerProvider.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default withFirebase(TaskManagerProvider);
