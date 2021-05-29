import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

const themedStyles = StyleService.create({
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
});

const Counter = ({ count, isActive, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity style={styles.distractionCounter} onPress={onPress} disabled={!isActive}>
      <Text style={styles.counterText}>{count || 'Tap when distracted'}</Text>
    </TouchableOpacity>
  );
};

Counter.propTypes = {
  count: PropTypes.number,
  isActive: PropTypes.bool,
  onPress: PropTypes.func,
};

Counter.defaultProps = {
  count: 0,
  isActive: false,
  onPress: null,
};

export default Counter;
