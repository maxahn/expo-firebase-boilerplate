import Break from '../Break';

class WorkSession {
  constructor() {
    this.startTime = new Date().getTime();
    this.endTime = null;
    this.distractionCount = 0;
    this.breaks = [];
  }

  get startTime() {
    // returns unix time in seconds
    return Math.floor(this.startTime / 1000);
  }

  get endTime() {
    // returns unix time in seconds
    return Math.floor(this.endTime / 1000);
  }

  getLatestBreak() {
    const len = this.breaks.length;
    if (len < 1) return null;
    return this.breaks[len - 1];
  }

  endWorkSession() {
    this.endTime = new Date().getTime();
  }

  pause() {
    const newBreak = new Break();
    this.breaks.push(newBreak);
  }

  resume() {
    const latestBreak = this.getLatestBreak();
    if (latestBreak && latestBreak.end !== null)
      throw new Error('Work session cannot resume without being paused');
    latestBreak.endBreak();
  }

  // returns in seconds
  getWorkSessionDuration() {
    if (!this.startTime) {
      throw new Error('Invalid Work Session. There is no start time.');
    }
    const end = this.endTime ? this.endTime : new Date().getTime();
    const workSpanSeconds = Math.floor((end - this.startTime) / 1000);
    const totalBreakTime = this.breaks.reduce((acc, curr) => acc + curr.getDuration(), 0);
    return workSpanSeconds - totalBreakTime;
  }
}

export default WorkSession;
