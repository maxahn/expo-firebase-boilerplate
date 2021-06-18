import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Divider, Layout, StyleService, useStyleSheet, Icon, List } from '@ui-kitten/components';
import { TASKS } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import { withTasks } from '../../services/Tasks';
import TaskItem from '../../components/molecules/TaskItem';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-4',
  },
  listContainer: {
    maxHeight: '100%',
    backgroundColor: 'background-basic-color-4',
  },
  addButton: {
    position: 'absolute',
    width: 75,
    height: 75,
    right: 10,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 100,
    backgroundColor: 'color-primary-500',
    elevation: 8,
  },
  addIcon: {
    width: 45,
    height: 45,
    color: 'color-primary-100',
  },
});

const renderTaskItem = ({ item }) => {
  const {
    title,
    description,
    estimatedMinutesToComplete,
    isComplete,
    dateTimeComplete,
    uid,
  } = item;
  return (
    <TaskItem
      title={title}
      description={description}
      isComplete={isComplete}
      estimatedMinutesToComplete={estimatedMinutesToComplete}
      dateTimeComplete={dateTimeComplete}
      uid={uid}
    />
  );
};

const TaskList = ({ tasks }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <>
      <Header isMenuVisible title={capitalize(TASKS)} />
      <Divider />
      <Layout style={styles.container}>
        <List
          data={tasks}
          renderItem={renderTaskItem}
          style={styles.listContainer}
          ItemSeparatorComponent={Divider}
        />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" fill={styles.addIcon.color} style={styles.addIcon} animation="zoom" />
        </TouchableOpacity>
      </Layout>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uid: PropTypes.string,
      estimatedMinutesToComplete: PropTypes.number,
      isCompleted: PropTypes.bool,
    }),
  ),
};

TaskList.defaultProps = {
  tasks: [],
};

export default withTasks(TaskList);
