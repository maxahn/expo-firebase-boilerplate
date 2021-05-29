import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleService, useStyleSheet, Select, SelectItem } from '@ui-kitten/components';
import { TaskManager, withTaskManager } from '../../../services/TaskManager';

const themedSelectorStyles = StyleService.create({
  select: {
    marginTop: 20,
    width: 350,
  },
});

const TaskSelector = withTaskManager(({ taskManager }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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

export default TaskSelector;
