import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleService, useStyleSheet, Select, SelectItem } from '@ui-kitten/components';
import { withTasks } from '../../../services/Tasks';

const themedSelectorStyles = StyleService.create({
  select: {
    marginTop: 20,
    width: 350,
  },
});

const TaskSelector = ({ tasks }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const styles = useStyleSheet(themedSelectorStyles);
  const selectItems = tasks.map(({ uid, title }) => <SelectItem key={uid} title={title} />);
  const activeTask = tasks[selectedIndex.row];
  const activeTitle = selectedIndex && activeTask ? activeTask.title : '';
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
};

TaskSelector.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uid: PropTypes.string,
      estimatedMinutesToComplete: PropTypes.number,
      isCompleted: PropTypes.bool,
    }),
  ),
};

TaskSelector.defaultProps = {
  tasks: [],
};

export default withTasks(TaskSelector);
