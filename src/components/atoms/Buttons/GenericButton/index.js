import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleService, useStyleSheet } from '@ui-kitten/components';

const themedStyles = StyleService.create({
  button: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  icon: {
    backgroundColor: 'color-primary-100',
  },
});

const GenericButton = ({ onPress, text }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Button style={styles.button} onPress={onPress}>
      {text}
    </Button>
  );
};

GenericButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default GenericButton;
