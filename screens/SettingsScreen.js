import React from 'react';
import { Text, View, StyleSheet, Platform, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';

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

export default SettingsScreen;
