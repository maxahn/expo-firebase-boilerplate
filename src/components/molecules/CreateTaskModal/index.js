import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text, Input, Spinner, useStyleSheet } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { Firebase, withFirebase } from '../../../services/Firebase';

const themedStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // gap: '12px',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Header = (props) => (
  <View {...props}>
    <Text category="h4">Add Task</Text>
  </View>
);

// const ESTIMATED_MINUTES_OPTIONS = [5, 30, 60];
// function minutesToOption(minutes) {
//   const hours = Math.floor(minutes / 60);
//   const leftOverMin = minutes - 60 * hours;
//   let result = '';
//   if (hours) {
//     result = `${hours} hours`;
//   }
//   if (leftOverMin) {
//     result += `${leftOverMin} min`;
//   }
//   return result;
// }

const CreateTaskModal = ({ visible, onClose, firebase }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const styles = useStyleSheet(themedStyles);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function createTask(values) {
    try {
      setIsSubmitting(true);
      const { title, description, estimatedMinutes } = values;
      await firebase.doCreateTask(title, description, estimatedMinutes);
      setIsSubmitting(false);
      reset({ title: '', description: '', estimatedMinutes: '' });
      onClose();
    } catch (err) {
      setIsSubmitting(false);
    }
  }

  const LoadingIndicator = ({ style }) => (
    <View style={[style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );
  LoadingIndicator.propTypes = {
    style: PropTypes.shape({}),
  };

  LoadingIndicator.defaultProps = {
    style: {},
  };

  const Footer = (props) => (
    <View {...props} style={styles.footer}>
      <Button onPress={onClose}>Cancel</Button>
      <Button
        onPress={handleSubmit(createTask)}
        accessoryLeft={isSubmitting ? LoadingIndicator : null}
      >
        Add
      </Button>
    </View>
  );

  return (
    <View>
      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onClose}>
        <Card disabled header={Header} footer={Footer} styles={styles.card}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Title"
                status={errors.title ? 'danger' : null}
              />
            )}
            defaultValue=""
          />
          {errors.title && <Text>Title is required</Text>}
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Description"
                status={errors.description ? 'danger' : null}
              />
            )}
            defaultValue=""
          />
          <Controller
            name="estimatedMinutes"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Estimated Minutes"
                rules={{
                  valueAsNumber: true,
                }}
                status={errors.estimatedMinutes ? 'danger' : null}
              />
            )}
            defaultValue={30}
          />
          {errors && errors.estimatedMinutes ? <Text>Estimation is required</Text> : null}
        </Card>
      </Modal>
    </View>
  );
};

CreateTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(CreateTaskModal);
