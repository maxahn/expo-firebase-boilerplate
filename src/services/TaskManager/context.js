import React from 'react';

const TaskManagerContext = React.createContext([]);

// eslint-disable-next-line react/display-name
const withTaskManager = (Component) => (props) => (
  <TaskManagerContext.Consumer>
    {(taskManager) => <Component {...props} taskManager={taskManager} />}
  </TaskManagerContext.Consumer>
);

export { TaskManagerContext, withTaskManager };
