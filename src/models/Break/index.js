class Break {
  constructor() {
    this.startTime = new Date().getTime();
    this.endTime = null;
  }

  get startTime() {
    // returns unix time in seconds
    return Math.floor(this.startTime / 1000);
  }

  get endTime() {
    // returns unix time in seconds
    return Math.floor(this.endTime / 1000);
  }

  endBreak() {
    this.endTime = new Date().getTime();
  }

  getDuration() {
    return Math.floor((this.endTime - this.startTime) / 1000);
  }
}

export default Break;
