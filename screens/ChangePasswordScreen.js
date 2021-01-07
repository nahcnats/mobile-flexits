import React from 'react';
import { Text, View, StyleSheet, Platform, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';

import Colors from '../constants/Colors';

const ChangePasswordScreen = props => {
  useFocusEffect(() => {
    console.log('ChangePasswordScreen focused');
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text>ChangePasswordScreen</Text>
    </View>
  );
}

export const changePasswordScreenOptions = navData => {
  return {
    headerTitle: 'Change Password',
    headerLeft: () => (
      <HeaderMenuButton onToggleMenu={() => { navData.navigation.toggleDrawer() }} />
    ),
    headerRight: () => (
      <HeaderLogoutButton />
    ),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChangePasswordScreen;
