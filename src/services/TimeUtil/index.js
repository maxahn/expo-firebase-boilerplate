// given minutes, return string in hh:mm format
const minutesToColonNotation = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes - hrs * 60;
  return `${hrs}:${mins}`;
};

const secondsToColonNotation = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  return `${hrs}:${mins}`;
};

export { minutesToColonNotation, secondsToColonNotation };
