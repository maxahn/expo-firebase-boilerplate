import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SIGN_IN, SIGN_UP } from '../../../../../constants/routes';
import SignIn from '../../../../../screens/SignIn';
import SignUp from '../../../../../screens/SignUp';

const { Navigator, Screen } = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name={SIGN_IN} component={SignIn} />
        <Screen name={SIGN_UP} component={SignUp} />
      </Navigator>
    </NavigationContainer>
  );
}
