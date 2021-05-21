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
import { SIGNUP } from '../../constants/routes';

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
    marginBottom: 5,
  },
  button: {
    margin: 2,
    marginTop: 10,
  },
});

const Login = ({ firebase, navigation }) => {
  const [error, setError] = useState('');
  const { handleSubmit, control, errors } = useForm();
  const styles = useStyleSheet(themedStyles);

  const onSubmit = (values) => {
    const { email, password } = values;
    firebase.doSignInWithEmailAndPassword(email, password).catch(({ code }) => {
      // TODO: refactor so message is sent server side so specific codes are not revealed to user
      console.log({ code });
      let message = '';
      switch (code) {
        case 'auth/expired-action-code':
          message = 'Session timed out. Please try again.';
          break;
        case 'auth/invalid-action-code':
          message = 'Invalid action';
          break;
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          message = 'Sign in credentials not valid';
          break;
        default:
          message = 'Unexpected error. Please try again later.';
          break;
      }
      console.log({ message });
      setError(message);
    });
  };

  const navigateToSignUp = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h2">Login</Text>
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
          rules={{ required: true }}
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
        <Button onPress={handleSubmit(onSubmit)}>Log In</Button>
        <Button onPress={navigateToSignUp} size="tiny" appearance="ghost">
          Don&apos;t have an account? Sign Up
        </Button>
      </Card>
    </Layout>
  );
};

Login.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(Login);
