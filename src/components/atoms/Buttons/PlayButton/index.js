import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';

const themedStyles = StyleService.create({
  startButton: {
    marginTop: 10,
  },
  icon: {
    backgroundColor: 'color-primary-100',
  },
});

const PlayIcon = (props) => {
  const styles = useStyleSheet(themedStyles);
  return <Icon {...props} name="arrow-right" fill={styles.icon.backgroundColor} />;
};

const PlayButton = ({ hasStarted, onPress }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Button style={styles.startButton} accessoryRight={PlayIcon} onPress={onPress}>
      {hasStarted ? 'Resume' : 'Start'}
    </Button>
  );
};

PlayButton.propTypes = {
  hasStarted: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

PlayButton.defaultProps = {
  hasStarted: false,
};

export default PlayButton;
