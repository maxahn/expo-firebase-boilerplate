import React from 'react';
import PropTypes from 'prop-types';
import PlayButton from '../PlayButton';
import GenericButton from '../GenericButton';

const PlayPauseButton = ({ hasStarted, isPaused, onPlay, onPause }) =>
  isPaused ? (
    <PlayButton hasStarted={hasStarted} onPress={onPlay} />
  ) : (
    <GenericButton onPress={onPause} text="Pause" />
  );

PlayPauseButton.propTypes = {
  hasStarted: PropTypes.bool,
  isPaused: PropTypes.bool,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
};

PlayPauseButton.defaultProps = {
  hasStarted: false,
  isPaused: false,
};

export default PlayPauseButton;
