import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {
  Divider,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  ListItem,
  List,
  CheckBox,
} from '@ui-kitten/components';
import { TASKS } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';
import Firebase, { withFirebase } from '../../services/Firebase';

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

/*
  Task Item:
    - description (string)
    - estimated completion time (time)
    - work sessions (array of WorkSessions)
      - Work Session:
        - start date time 
        - end date time
*/

const TaskListItem = ({ title, isCompleted }) => {
  const [checked, setChecked] = React.useState(isCompleted);
  const CheckBoxAccessory = (props) => (
    <CheckBox {...props} checked={checked} onChange={(nextChecked) => setChecked(nextChecked)} />
  );

  return <ListItem title={title} accessoryLeft={CheckBoxAccessory} />;
};

TaskListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
};

TaskListItem.defaultProps = {
  isCompleted: false,
};

const renderTaskItem = ({ item }) => {
  const { title, description, estimatedMinutesToComplete, isCompleted, dateTimeCompleted } = item;
  return (
    <TaskListItem
      title={title}
      description={description}
      isCompleted={isCompleted}
      estimatedMinutesToComplete={estimatedMinutesToComplete}
      dateTimeCompleted={dateTimeCompleted}
    />
  );
};

const Tasks = ({ firebase }) => {
  const styles = useStyleSheet(themedStyles);
  const [tasks, setTasks] = React.useState([]);

  const fetchTasks = async () => {
    const getTasksCallable = firebase.functions.httpsCallable('getTasks');
    const result = await getTasksCallable();
    setTasks(result.data);
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
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(Tasks);
