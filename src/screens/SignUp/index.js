import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Layout,
  Text,
  Card,
  Button,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { Firebase, withFirebase } from '../../services/Firebase';
import { LOGIN } from '../../constants/routes';

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'background-basic-color-4',
  },
  card: {
    flex: -1,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: 'background-basic-color-1',
  },
  input: {
    width: 250,
  },
});

const SignUp = ({ firebase, navigation }) => {
  const [error, setError] = useState('');
  const { handleSubmit, control, errors } = useForm();
  const styles = useStyleSheet(themedStyles);

  const onSubmit = (values) => {
    const { username, email, password } = values;
    firebase.doCreateUserWithUsername(username, email, password).catch((err) => {
      // TODO: implement flash error messages
      const { code } = err;
      let message = '';
      switch (code) {
        case 'already-exists':
          message = 'Given email is already in use.';
          break;
        default:
          message = 'Unexpected error. Please try again later.';
          break;
      }
      setError(message);
    });
  };

  const navigateToSignIn = () => {
    navigation.navigate(LOGIN);
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h2">Sign Up</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Username"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              status={errors.username ? 'danger' : null}
            />
          )}
          name="username"
          rules={{
            required: {
              value: true,
              message: 'Username is required',
            },
            minLength: {
              value: 3,
              message: 'Username must be at 3 characters long.',
            },
          }}
          defaultValue=""
        />
        {errors.username && (
          <Text status="danger" category="c1">
            {errors.username.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="E-mail"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              status={errors.email ? 'danger' : null}
            />
          )}
          name="email"
          rules={{
            required: {
              value: true,
              message: 'E-mail address is required.',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          defaultValue=""
        />
        {errors.email && (
          <Text status="danger" category="c1">
            {errors.email.message}
          </Text>
        )}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              label="Password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val)}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: {
              value: true,
              message: 'Password is required.',
            },
            minLength: {
              value: 6,
              message: 'Password must be at 6 characters long.',
            },
          }}
          defaultValue=""
        />
        {errors.password && (
          <Text status="danger" category="c1">
            {errors.password.message}
          </Text>
        )}
        <Text category="c1" status="danger">
          {error}
        </Text>
        <Button title="Submit" onPress={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
        <Button onPress={navigateToSignIn} size="tiny" appearance="ghost">
          Already have an account? Sign In
        </Button>
      </Card>
    </Layout>
  );
};

SignUp.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(SignUp);
