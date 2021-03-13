import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../AuthNavigator';
// import HomeNavigator from '../HomeNavigator';
import Home from '../../../screens/Home';
import Profile from '../../../screens/Profile';
import { AUTH, HOME, PROFILE } from '../../../constants/routes';

const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator headerMode="none">
        <Screen name={AUTH} component={AuthNavigator} />
        <Screen name={HOME} component={Home} />
        <Screen name={PROFILE} component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
}
