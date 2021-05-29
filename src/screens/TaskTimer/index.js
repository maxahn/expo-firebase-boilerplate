import React, { useState } from 'react';
import { Divider, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Timer from '../../components/molecules/Timer';
import TaskSelector from '../../components/molecules/TaskSelector';
import Counter from '../../components/molecules/Counter';
import { TASK_TIMER } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import PlayPauseButton from '../../components/atoms/Buttons/PlayPauseButton';
import GenericButton from '../../components/atoms/Buttons/GenericButton';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-basic-color-4',
  },
  buttonSet: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

const TaskTimer = () => {
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [distractionCount, setDistractionCount] = useState(0);
  const styles = useStyleSheet(themedStyles);

  const onStart = () => {
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

  return (
    <>
      <Header isMenuVisible title={capitalize(TASK_TIMER)} />
      <Divider />
      <Layout style={styles.container}>
        <Timer startTime={startTime} isActive={isActive} />
        <Counter isActive={isActive} count={distractionCount} onPress={onDistraction} />
        <View style={styles.buttonSet}>
          <PlayPauseButton
            hasStarted={!!startTime}
            isPaused={!isActive}
            onPlay={onStart}
            onPause={onPause}
          />
          {startTime || isActive ? <GenericButton text="End" onPress={onEnd} /> : null}
        </View>
        <TaskSelector />
      </Layout>
    </>
  );
};

export default TaskTimer;
