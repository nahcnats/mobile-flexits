import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';

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
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {navData.navigation.toggleDrawer()}}
        />
      </HeaderButtons>
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
