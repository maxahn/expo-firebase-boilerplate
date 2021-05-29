class TaskManager {
  constructor(firebase) {
    this.firebase = firebase;
    this.user = firebase.auth.currentUser;
    this.tasks = [];
  }

  setTasks = (tasks) => {
    this.tasks = tasks;
  };

  fetchTasks = () => {
    const getTasksCallable = this.firebase.functions.httpsCallable('getTasks');
    return getTasksCallable().catch((error) => console.log({ error }));
  };

  updateTask = async (uid, taskChanges) => {
    const updateTask = this.firebase.functions.httpsCallable('updateTask');
    const result = await updateTask({ ...taskChanges, uid });
    return result;
  };
}

export default TaskManager;
