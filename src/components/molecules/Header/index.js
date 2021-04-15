import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  MenuItem,
  OverflowMenu,
  // useTheme
} from '@ui-kitten/components';
import { withFirebase, Firebase } from '../../../services/Firebase';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight,
  },
});

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const EditIcon = (props) => <Icon {...props} name="edit" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const Header = ({ title, isMenuVisible, isBackVisible, backCallback, firebase }) => {
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
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" onPress={firebase.doSignOut} />
      </OverflowMenu>
    </>
  );

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} onPress={backCallback} />;

  return (
    <TopNavigation
      alignment="center"
      title={() => <Text>{title}</Text>}
      accessoryLeft={isBackVisible ? renderBackAction : null}
      accessoryRight={isMenuVisible ? renderRightActions : null}
      style={styles.header}
    />
  );
};

Header.propTypes = {
  title: PropTypes.string,
  isMenuVisible: PropTypes.bool,
  isBackVisible: PropTypes.bool,
  backCallback: PropTypes.instanceOf(TopNavigationAction),
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

Header.defaultProps = {
  title: '',
  isMenuVisible: false,
  isBackVisible: false,
  backCallback: null,
};

export default withFirebase(Header);
