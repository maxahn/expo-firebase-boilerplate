import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import Home from '../../scenes/Home';
import Login from '../../scenes/Login';
import SignUp from '../../scenes/SignUp';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="HOME" />
    <BottomNavigationTab title="LOGIN" />
    <BottomNavigationTab title="SIGNUP" />
  </BottomNavigation>
);

BottomTabBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  state: PropTypes.shape({
    index: PropTypes.number,
    routeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name="Login" component={Login} />
    <Screen name="SignUp" component={SignUp} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
