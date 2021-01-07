import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import HeaderMenuButton from '../components/UI/HeaderMenuButton';
import HeaderLogoutButton from '../components/UI/HeaderLogoutButton';

import Colors from '../constants/Colors';

const AttendanceScreen = props => {
  useFocusEffect(() => {
    console.log('AttendanceScreen focused');
  }, [props.navigation]);

  return (
    <View style={styles.container}>
        <Text>AttendanceScreen</Text>
    </View>
  );
}

// TODO: Add reload / refresh function

export const attendanceScreenOptions = navData => {
  return {
    headerTitle: 'Your Attandance',
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

export default AttendanceScreen;
