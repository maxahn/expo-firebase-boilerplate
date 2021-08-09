import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text, Input, Select, SelectItem } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';

const styles = StyleSheet.create({
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
    gap: '12px',
    padding: '12px',
  },
});

const Header = (props) => (
  <View {...props}>
    <Text category="h4">Add Task</Text>
  </View>
);

const ESTIMATED_MINUTES_OPTIONS = [5, 30, 60];
function minutesToOption(minutes) {
  const hours = Math.floor(minutes / 60);
  const leftOverMin = minutes - 60 * hours;
  let result = '';
  if (hours) {
    result = `${hours} hours`;
  }
  if (leftOverMin) {
    result += `${leftOverMin} min`;
  }
  return result;
}

const CreateTaskModal = ({ visible, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Footer = (props) => (
    <View {...props} style={styles.footer}>
      <Button onPress={onClose}>Cancel</Button>
      <Button onPress={handleSubmit}>Add</Button>
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
              <Input onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Title" />
            )}
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
              />
            )}
          />
          <Controller
            name="estimatedMinutes"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                onSelect={({ row }) => {
                  onChange(row);
                }}
                value={
                  value === 3 ? 'Enter manually' : minutesToOption(ESTIMATED_MINUTES_OPTIONS[value])
                }
              >
                <SelectItem title={minutesToOption(ESTIMATED_MINUTES_OPTIONS[0])} />
                <SelectItem title={minutesToOption(ESTIMATED_MINUTES_OPTIONS[1])} />
                <SelectItem title={minutesToOption(ESTIMATED_MINUTES_OPTIONS[2])} />
                <SelectItem title="Enter manually" />
              </Select>
            )}
          />
          {errors.estiamtedMinutes && <Text>Estimation is required</Text>}
        </Card>
      </Modal>
    </View>
  );
};

CreateTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateTaskModal;
