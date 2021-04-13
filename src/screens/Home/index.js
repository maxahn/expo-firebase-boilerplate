import React from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import {
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  MenuItem,
  OverflowMenu,
  Divider,
  // useTheme
} from '@ui-kitten/components';
import { HOME } from '../../constants/routes';
import capitalize from '../../services/StringUtil';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight,
  },
  body: {
    flex: 1,
    backgroundColor: 'red',
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
  // const theme = useTheme();

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
    // <Layout style={styles.container} level="1">
    <SafeAreaView>
      <TopNavigation
        alignment="center"
        title={() => <Text>{capitalize(HOME)}</Text>}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
        style={styles.header}
      />
      <Divider />
      <View>
        {/* <Layout style={styles.body}> */}
        <Text category="h1">Boots</Text>
        <Text category="h2">Boots2</Text>
        {/* </Layout> */}
      </View>
    </SafeAreaView>
    // </Layout>
  );
};

export default Home;
