import React from 'react';
import { Text, View, StyleSheet, Platform, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';


import Colors from '../constants/Colors';

const SettingsScreen = props => {
  useFocusEffect(() => {
    console.log('SettingsScreen focused');
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
}

export const settingsScreenOptions = navData => {
  return {
    headerTitle: 'Settings',
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

export default SettingsScreen;
