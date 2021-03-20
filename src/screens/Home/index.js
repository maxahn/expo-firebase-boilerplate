import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  MenuItem,
  OverflowMenu,
  Divider,
} from '@ui-kitten/components';
import { HOME } from '../../constants/routes';
import capitalize from '../../services/StringUtil';

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  body: {
    flex: 6,
    backgroundColor: 'green',
  },
});

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const EditIcon = (props) => <Icon {...props} name="edit" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

// const BackAction = () => (<TopNavigationAction icon={BackIcon} />);

const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const Home = () => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;

  const renderRightActions = () => (
    <>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </>
  );

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <SafeAreaView>
      <TopNavigation
        alignment="center"
        title={capitalize(HOME)}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
        style={styles.header}
      />
      <Divider />
      <Layout style={styles.container} level="1">
        {/* <Layout style={styles.body}> */}
        <Text>Body</Text>
        {/* </Layout> */}
      </Layout>
    </SafeAreaView>
  );
};

export default Home;
