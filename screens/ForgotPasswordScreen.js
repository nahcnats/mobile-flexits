import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ForgotPasswordScreen = props => {
  return (
    <View style={styles.container}>
        <Text>ForgotPasswordScreen</Text>
    </View>
  );
}

export const forgotPasswordScreenOptions = navData => {
  return {
    headerTitle: 'Forgot Password',
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ForgotPasswordScreen;
