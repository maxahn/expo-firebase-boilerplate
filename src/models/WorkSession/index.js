class WorkSession {
  constructor() {
    this.start = new Date().getTime();
  }

  endWorkSession() {
    this.end = new Date().getTime();
  }

  // returns in minutes
  getWorkSessionDuration() {
    if (!this.start) {
      throw new Error('Invalid Work Session. There is no start time.');
    }
    const end = this.end ? this.end : new Date().getTime();
    return (end - this.start) / (60 * 1000);
  }
}

export default WorkSession;
