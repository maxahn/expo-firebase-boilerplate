import React from 'react';

const TasksContext = React.createContext([]);

// eslint-disable-next-line react/display-name
const withTasks = (Component) => (props) => (
  <TasksContext.Consumer>{(tasks) => <Component {...props} tasks={tasks} />}</TasksContext.Consumer>
);

export { TasksContext, withTasks };
