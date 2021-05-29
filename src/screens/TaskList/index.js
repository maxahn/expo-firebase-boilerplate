import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import {
  Divider,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  ListItem,
  List,
  CheckBox,
  Text,
} from '@ui-kitten/components';
import { TASKS } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import { Firebase, withFirebase } from '../../services/Firebase';
import { TaskManager, withTaskManager } from '../../services/TaskManager';
import { minutesToColonNotation } from '../../services/TimeUtil';

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

const accessoryStyles = StyleService.create({
  estimatedDuration: {
    color: 'color-info-400',
    fontSize: 12,
  },
  playButton: {},
  playIcon: {
    backgroundColor: 'color-success-400',
  },
});

/*
  Task Item:
    - description (string)
    - estimated completion time (time)
    - work sessions (array of WorkSessions)
      - Work Session:
        - start date time 
        - end date time
*/

const TaskListItem = withFirebase(
  ({ firebase, title, isCompleted, estimatedMinutesToComplete, uid }) => {
    const styles = useStyleSheet(accessoryStyles);
    const [checked, setChecked] = React.useState(isCompleted);

    const onTaskChange = (nextChecked) => {
      setChecked(nextChecked);
      const updateTask = firebase.functions.httpsCallable('updateTask');
      updateTask({ isCompleted: nextChecked, uid }).catch(() => {
        setChecked(!nextChecked);
        // TODO: handle error
      });
    };

    const CheckBoxAccessory = (props) => (
      <CheckBox {...props} checked={checked} onChange={onTaskChange} />
    );

    /*
    const PlayButton = (props) => (
      <TouchableOpacity styles={styles.playButton}>
        <Icon {...props} fill={styles.playIcon.backgroundColor} name="play-circle-outline" />
      </TouchableOpacity>
    );
    */

    const EstimatedDurationAccessory = (props) => (
      <View {...props}>
        <Text style={styles.estimatedDuration}>
          {minutesToColonNotation(estimatedMinutesToComplete)}
        </Text>
      </View>
    );
    return (
      <ListItem
        title={title}
        accessoryLeft={CheckBoxAccessory}
        accessoryRight={EstimatedDurationAccessory}
      />
    );
  },
);

TaskListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  estimatedMinutesToComplete: PropTypes.number.isRequired,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

TaskListItem.defaultProps = {
  isCompleted: false,
};

const renderTaskItem = ({ item }) => {
  const {
    title,
    description,
    estimatedMinutesToComplete,
    isCompleted,
    dateTimeCompleted,
    uid,
  } = item;
  return (
    <TaskListItem
      title={title}
      description={description}
      isCompleted={isCompleted}
      estimatedMinutesToComplete={estimatedMinutesToComplete}
      dateTimeCompleted={dateTimeCompleted}
      uid={uid}
    />
  );
};

const Tasks = ({ taskManager }) => {
  const styles = useStyleSheet(themedStyles);
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = async () => {
    const result = await taskManager.fetchTasks().catch(() => {
      // TODO: handle error
    });
    taskManager.setTasks(result.data);
    setTasks(taskManager.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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

Tasks.propTypes = {
  taskManager: PropTypes.instanceOf(TaskManager).isRequired,
};

export default withTaskManager(Tasks);
