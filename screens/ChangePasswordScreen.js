import React from 'react';
import { Text, View, StyleSheet, Platform, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';

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

export default ChangePasswordScreen;
