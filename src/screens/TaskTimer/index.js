import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Divider,
  Layout,
  Button,
  StyleService,
  useStyleSheet,
  Select,
  SelectItem,
  Icon,
} from '@ui-kitten/components';
import { View, TouchableOpacity } from 'react-native';
import { TASK_TIMER } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import { TaskManager, withTaskManager } from '../../services/TaskManager';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-basic-color-4',
  },
  distractionCounter: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 225,
    height: 225,
    borderRadius: 150,
    backgroundColor: 'background-basic-color-4',
    borderWidth: 2,
    borderColor: 'color-primary-100',
  },
  counterText: {
    fontSize: 16,
  },
  startButton: {
    marginTop: 20,
  },
  pauseButton: {
    // marginTop: 20,
    marginHorizontal: 10,
  },
  endButton: {
    marginHorizontal: 10,
  },
  icon: {
    backgroundColor: 'color-primary-100',
  },
  buttonSet: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

const themedTimerStyles = StyleService.create({
  timerContainer: {
    padding: 20,
  },
  timerText: {
    fontSize: 50,
  },
});

const themedSelectorStyles = StyleService.create({
  select: {
    marginTop: 20,
    width: 350,
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

const TaskSelector = withTaskManager(({ taskManager }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const styles = useStyleSheet(themedSelectorStyles);
  const selectItems = taskManager.tasks.map(({ uid, title }) => (
    <SelectItem key={uid} title={title} />
  ));
  const activeTitle = selectedIndex ? taskManager.tasks[selectedIndex.row].title : '';
  return (
    <Select
      style={styles.select}
      placeholder="Please choose task"
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
      value={activeTitle}
    >
      {selectItems}
    </Select>
  );
});

TaskSelector.propTypes = {
  taskManager: PropTypes.instanceOf(TaskManager).isRequired,
};

const TaskTimer = () => {
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [distractionCount, setDistractionCount] = useState(0);
  const styles = useStyleSheet(themedStyles);

  const onStart = () => {
    // if (startTime) {
    //   setIsActive(true);
    //   return;
    // }
    // const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    // setStartTime(currentUnixTime);
    const currentUnixTime = Math.floor(new Date().getTime() / 1000);
    setStartTime(currentUnixTime);
    setIsActive(true);
  };

  const onPause = () => {
    setIsActive(false);
  };

  const onEnd = () => {
    setIsActive(false);
    setStartTime(null);
    setDistractionCount(0);
  };

  const onDistraction = () => setDistractionCount(distractionCount + 1);

  const PlayIcon = (props) => (
    <Icon {...props} name="arrow-right" fill={styles.icon.backgroundColor} />
  );

  const StartButton = () => (
    <Button style={styles.startButton} accessoryRight={PlayIcon} onPress={onStart}>
      {startTime ? 'Resume' : 'Start'}
    </Button>
  );
  const PauseButton = () => (
    <Button style={styles.pauseButton} onPress={onPause}>
      Pause
    </Button>
  );

  const EndButton = () => (
    <Button style={styles.endButton} onPress={onEnd} status="success">
      End
    </Button>
  );

  return (
    <>
      <Header isMenuVisible title={capitalize(TASK_TIMER)} />
      <Divider />
      <Layout style={styles.container}>
        <Timer startTime={startTime} isActive={isActive} />
        <TouchableOpacity
          style={styles.distractionCounter}
          onPress={onDistraction}
          disabled={!isActive}
        >
          <Text style={styles.counterText}>{distractionCount || 'Tap when distracted'}</Text>
        </TouchableOpacity>
        {isActive ? (
          <View style={styles.buttonSet}>
            <PauseButton />
            <EndButton />
          </View>
        ) : (
          <StartButton />
        )}
        <TaskSelector />
      </Layout>
    </>
  );
};

export default TaskTimer;
