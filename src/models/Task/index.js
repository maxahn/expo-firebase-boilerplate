class Task {
  constructor(title, description, estimatedMinutesToComplete) {
    this.title = title;
    this.description = description;
    this.estimatedMinutesToComplete = estimatedMinutesToComplete;
    this.workSessions = [];
    this.isCompleted = false;
    this.dateTimeCompleted = null;
  }
}

export default Task;
