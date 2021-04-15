import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LOGIN, SIGNUP } from '../../../../constants/routes';
import Login from '../../../../screens/Login';
import SignUp from '../../../../screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name={LOGIN} component={Login} />
        <Screen name={SIGNUP} component={SignUp} />
      </Navigator>
    </NavigationContainer>
  );
}
