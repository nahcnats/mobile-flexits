import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Greeting = props => {
  const userFullName = useSelector(state => state.auth.fullname);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {userFullName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  text: {
    fontFamily: 'open-sans'
  }
});

export default Greeting;
