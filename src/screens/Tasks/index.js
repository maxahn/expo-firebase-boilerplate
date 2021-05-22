import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Divider,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
  ListItem,
  List,
} from '@ui-kitten/components';
import { TASKS } from '../../constants/routes';
import capitalize from '../../services/StringUtil';
import Header from '../../components/molecules/Header';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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

const data = new Array(9).fill({
  title: 'Complete task manager app',
  description:
    'A task management that encourages users to estimate how long a task takes and compares with how long it actually takes.',
  estimatedMinutesToComplete: 45,
});

const renderTaskItem = ({ item }) => <ListItem title={item.title} description={item.description} />;

const Tasks = () => {
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      <Header isMenuVisible title={capitalize(TASKS)} />
      <Layout style={styles.container}>
        <List
          data={data}
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

export default Tasks;
