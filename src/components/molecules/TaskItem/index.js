import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleService, useStyleSheet, ListItem, CheckBox, Text } from '@ui-kitten/components';
import { Firebase, withFirebase } from '../../../services/Firebase';
import { minutesToColonNotation } from '../../../services/TimeUtil';

const themedStyles = StyleService.create({
  estimatedDurationContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    width: 'auto',
  },
  estimatedDuration: {
    color: 'color-info-400',
    fontSize: 12,
  },
  playButton: {},
  playIcon: {
    backgroundColor: 'color-success-400',
  },
});

const TaskItem = ({ firebase, title, isComplete, estimatedMinutes, uid }) => {
  const styles = useStyleSheet(themedStyles);
  const [checked, setChecked] = React.useState(isComplete);

  const onTaskChange = (nextChecked) => {
    setChecked(nextChecked);
    const { currentUser } = firebase.auth;
    if (!currentUser) throw new Error('Cannot edit task when not logged in!');
    firebase.db
      .collection('users')
      .doc(currentUser.uid)
      .collection('tasks')
      .doc(uid)
      .update({ isComplete: nextChecked })
      .then(() => {
        setChecked(nextChecked);
      })
      .catch(() => {
        setChecked(!nextChecked);
      });
    // updateTask({ isCompleted: nextChecked, uid }).catch(() => {
    //   setChecked(!nextChecked);
    //   // TODO: handle error
    // });
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
    <View {...props} style={styles.estimatedDurationContainer}>
      <Text style={styles.estimatedDuration}>{minutesToColonNotation(estimatedMinutes)}</Text>
    </View>
  );
  return (
    <ListItem
      title={title}
      accessoryLeft={CheckBoxAccessory}
      accessoryRight={EstimatedDurationAccessory}
    />
  );
};

TaskItem.propTypes = {
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  estimatedMinutes: PropTypes.number.isRequired,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  uid: PropTypes.string.isRequired,
};

TaskItem.defaultProps = {
  isComplete: false,
};

export default withFirebase(TaskItem);
