import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import capitalize from '../../../../../services/StringUtil';
// import Home from '../../../screens/Home';
// import Profile from '../../../screens/Profile';
import Tasks from '../../../../../screens/TaskList';
import TaskTimer from '../../../../../screens/TaskTimer';
import { TASKS } from '../../../../../constants/routes';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    {/* <BottomNavigationTab title={capitalize(HOME)} /> */}
    <BottomNavigationTab title={capitalize(TASKS)} />
    <BottomNavigationTab title="Task Timer" />
    {/* TODO: move this to a drawer */}
    {/* <BottomNavigationTab title={capitalize(PROFILE)} /> */}
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

const tabBar = (props) => <BottomTabBar {...props} />;

const BottomNavigationBar = () => (
  <NavigationContainer>
    <Navigator tabBar={tabBar}>
      {/* <Screen name={HOME} component={Home} /> */}
      <Screen name={TASKS} component={Tasks} />
      <Screen name="Task Timer" component={TaskTimer} />
      {/* <Screen name={PROFILE} component={Profile} /> */}
    </Navigator>
  </NavigationContainer>
);

export default BottomNavigationBar;
