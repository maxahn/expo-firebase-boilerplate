import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Input, Layout, Text, Card, Button } from '@ui-kitten/components';
import { useForm, Controller } from 'react-hook-form';
import { Firebase, withFirebase } from '../../services/Firebase';

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

const Login = ({ firebase }) => {
  const [error, setError] = useState(null);
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (values) => {
    const { email, password } = values;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        // TODO: redirect
        // console.log("login success!");
      })
      .catch((err) => {
        setError(err);
        // console.log(err);
      });
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text category="h2">LOGIN</Text>
        <Text category="c1" status="danger">
          {error}
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
            />
          )}
          name="email"
          rules={{ required: true }}
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
              type="password"
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
        <Button title="Submit" onPress={handleSubmit(onSubmit)}>
          Log In
        </Button>
      </Card>
    </Layout>
  );
};

Login.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(Login);
