class Task {
  constructor(description, estimatedMinutesToComplete) {
    this.description = description;
    this.estimatedMinutesToComplete = estimatedMinutesToComplete;
    this.workSessions = [];
  }
}

export default Task;
