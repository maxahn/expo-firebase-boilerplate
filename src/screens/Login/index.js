import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Layout, Text, Card, Button } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { Firebase, withFirebase } from '../../services/Firebase';
import { SIGNUP, HOME } from '../../constants/routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  card: {
    flex: -1,
    padding: 15,
    justifyContent: 'space-between',
  },
  input: {
    width: 250,
  },
});

const Login = ({ firebase, navigation }) => {
  const [error, setError] = useState(null);
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (values) => {
    const { email, password } = values;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate(HOME);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const navigateToSignUp = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h2">Login</Text>
        <Text category="c1" status="danger">
          {error ? `${error.code}: ${error.message} (${error.a})` : null}
        </Text>
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
        {/* <Link to={SIGNUP}>Don&apos;t have an account? Sign up here</Link> */}
        <Text onPress={navigateToSignUp}>Sign Up</Text>
        <Button title="Submit" onPress={handleSubmit(onSubmit)}>
          Log In
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
