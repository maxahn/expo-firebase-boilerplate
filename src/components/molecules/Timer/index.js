import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';
import { View } from 'react-native';

const themedTimerStyles = StyleService.create({
  timerContainer: {
    padding: 20,
  },
  timerText: {
    fontSize: 50,
  },
});

const Timer = ({ startTime, isActive }) => {
  const [counter, setCounter] = useState('00:00');
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const styles = useStyleSheet(themedTimerStyles);

  const getColonNotation = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    let secondsRemaining = seconds - hrs * 3600;
    const mins = Math.floor(secondsRemaining / 60);
    secondsRemaining -= mins * 60;

    const secFormatted = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
    const minFormatted = mins < 10 ? `0${mins}` : mins;
    if (!hrs) return `${minFormatted}:${secFormatted}`;
    return `${hrs}:${minFormatted}:${secFormatted}`;
  };

  const getElapsedTime = () => {
    if (!startTime) return 0;
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    return currentUnixTime - startTime;
  };

  // TODO: Make sure this timer works even when user navigates away from the app and comes back
  useEffect(() => {
    if (!startTime) {
      setCounter('00:00');
      setSecondsElapsed(0);
      return;
    }
    if (!isActive) return;
    if (!secondsElapsed) {
      setSecondsElapsed(getElapsedTime());
    }
    setTimeout(() => {
      if (!isActive) return;
      setSecondsElapsed(secondsElapsed + 1);
      setCounter(getColonNotation(secondsElapsed));
    }, 1000);
  }, [secondsElapsed, startTime]);

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{counter}</Text>
    </View>
  );
};

Timer.propTypes = {
  startTime: PropTypes.number,
  isActive: PropTypes.bool,
};

Timer.defaultProps = {
  startTime: null,
  isActive: false,
};

export default Timer;
